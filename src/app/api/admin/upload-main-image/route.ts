import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import sharp from 'sharp';
import { createHandle } from '@/lib/admin-utils';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

const RESOURCE_DIRS = {
    products: 'products',
    solutions: 'solutions',
    cases: 'cases',
} as const;

type ResourceType = keyof typeof RESOURCE_DIRS;

function isResourceType(value: FormDataEntryValue | null): value is ResourceType {
    return typeof value === 'string' && value in RESOURCE_DIRS;
}

function cleanText(value: FormDataEntryValue | null) {
    return typeof value === 'string' ? value : '';
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const resourceTypeValue = formData.get('resourceType');
        const fileValue = formData.get('file');

        if (!isResourceType(resourceTypeValue)) {
            return NextResponse.json({ success: false, error: 'Invalid image section' }, { status: 400 });
        }

        if (!fileValue || typeof fileValue === 'string') {
            return NextResponse.json({ success: false, error: 'No image file uploaded' }, { status: 400 });
        }

        const file = fileValue as File;
        if (!ALLOWED_TYPES.has(file.type)) {
            return NextResponse.json({ success: false, error: 'Only JPG, PNG, WebP, and AVIF images are supported' }, { status: 400 });
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ success: false, error: 'Image must be 8MB or smaller' }, { status: 400 });
        }

        const requestedHandle = cleanText(formData.get('entityHandle'));
        const entityName = cleanText(formData.get('entityName'));
        const handle = createHandle(requestedHandle || entityName, resourceTypeValue.slice(0, -1));
        const sourceBuffer = Buffer.from(await file.arrayBuffer());

        const optimizedBuffer = await sharp(sourceBuffer)
            .rotate()
            .resize({
                width: 1600,
                height: 1200,
                fit: 'inside',
                withoutEnlargement: true,
            })
            .webp({ quality: 82, effort: 5 })
            .toBuffer();

        const hash = createHash('sha256').update(optimizedBuffer).digest('hex').slice(0, 10);
        const fileName = `${handle}-main-${hash}.webp`;

        const publicRoot = path.join(process.cwd(), 'public');
        const destinationDir = path.join(publicRoot, RESOURCE_DIRS[resourceTypeValue], handle);
        const destinationPath = path.join(destinationDir, fileName);
        const resolvedPath = path.resolve(destinationPath);
        const resolvedPublicRoot = path.resolve(publicRoot);

        if (!resolvedPath.startsWith(resolvedPublicRoot + path.sep)) {
            return NextResponse.json({ success: false, error: 'Invalid upload path' }, { status: 400 });
        }

        await mkdir(destinationDir, { recursive: true });
        await writeFile(destinationPath, optimizedBuffer);

        const url = `/${RESOURCE_DIRS[resourceTypeValue]}/${handle}/${fileName}`;

        return NextResponse.json({
            success: true,
            url,
            fileName,
            widthLimit: 1600,
            format: 'webp',
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Image upload failed' }, { status: 500 });
    }
}
