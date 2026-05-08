async function testEmail() {
    const testCases = [
        {
            name: "Test User (English)",
            company: "AI Testing Ltd",
            email: "test@example.com",
            countryCode: "+1",
            phone: "1234567890",
            demands: ["Product Pricing & Quotation"],
            message: "This is a test inquiry from the English version of the site."
        },
        {
            name: "Тестовый Пользователь (Russian)",
            company: "ООО Тест Аи",
            email: "test_ru@example.com",
            countryCode: "+7",
            phone: "9998887766",
            demands: ["Запрос индивидуального решения"],
            message: "Это тестовый запрос из русской версии сайта. Проверка локализации и отправки."
        }
    ];

    for (const data of testCases) {
        console.log(`Sending test email for: ${data.name}...`);
        try {
            const response = await fetch('http://localhost:3000/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(`Result for ${data.name}:`, result);
        } catch (error) {
            console.error(`Error for ${data.name}:`, error.message);
        }
    }
}

testEmail();
