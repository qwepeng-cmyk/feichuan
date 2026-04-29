# N-TET Project Responsive Strategy (响应式开发规范)

## 核心目标
1. **100% 保护 PC 端样式**：PC 端代码已被调优至完美状态，任何移动端适配必须以“非侵入”方式进行。
2. **SEO 友好**：保持 URL 唯一，核心内容一致。
3. **性能与稳定性**：消除 Hydration Flicker（水合闪烁），确保离线/在线识别一致。

## 1. 结构规范：物理隔离 (Physical Isolation)
项目采用“双轨制”文件夹隔离策略：
- **`src/components/pc/`**: 存放所有经过验证的 PC 端组件。代码必须保持原样，禁止在此目录下的组件内写移动端适配代码。
- **`src/components/mobile/`**: 存放专门为移动端编写的组件。可以使用全新的布局逻辑。

### 文件命名约定：
- PC 组件：`Desktop[Name].tsx`
- 移动端组件：`Mobile[Name].tsx`

## 2. 调度规范：分流器 (The Switcher Pattern)
在页面 (`page.tsx`) 或布局入口，使用以下标准结构进行分流：

```tsx
import DesktopComp from './pc/DesktopComp';
import MobileComp from './mobile/MobileComp';

export default function Component() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .pc_only { display: block !important; }
        .mobile_only { display: none !important; }
        @media (max-width: 991px) {
          .pc_only { display: none !important; }
          .mobile_only { display: block !important; }
        }
      `}} />
      <div className="pc_only"><DesktopComp /></div>
      <div className="mobile_only"><MobileComp /></div>
    </>
  );
}
```

## 3. 样式规范 (Styling Rules)
1. **移动端专用样式**：优先使用 `[ComponentName].module.css` 存放在 `mobile/` 文件夹下，实现 100% 样式隔离。
2. **禁止修改全局 globals.css**：除非是定义新的全局变量，严禁在 `globals.css` 中修改已有的 PC 端类名属性。
3. **Tailwind 使用**：在分流器容器上使用 `lg:block` 等类名作为辅助，但核心切换逻辑以内嵌 CSS 为准。

## 4. 适配流程
1. **第一步**：将现有的页面内容提取到 `pc/DesktopPage.tsx`。
2. **第二步**：创建 `mobile/MobilePage.tsx`，参考样图从零编写。
3. **第三步**：在 `app/page.tsx` 中使用 **调度规范** 进行引用。
