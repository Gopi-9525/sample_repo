test("MainTask", async ({ page }) => {

    // Step 1: Login

    await page.goto("https://www.saucedemo.com/");

    // Verify website name
    await expect(page.locator('//div[text()="Swag Labs"]'))
        .toHaveText("Swag Labs");

    // Enter username
    await page.locator('//input[@placeholder="Username"]')
        .fill("standard_user");

    // Enter password
    await page.locator('//input[@placeholder="Password"]')
        .fill("secret_sauce");

    // Click Login
    await page.locator('//input[@id="login-button"]')
        .click();

    // Verify Products page
    await expect(page)
        .toHaveURL("https://www.saucedemo.com/inventory.html");

    await expect(page.locator('//span[text()="Products"]'))
        .toHaveText("Products");


    // Step 2: Select Products

    // Verify product list is displayed
    await expect(page.locator('//div[@class="inventory_item"]'))
        .toHaveCount(6);

    // Filter Low to High Price
    await page.locator('//select[@class="product_sort_container"]')
        .selectOption("lohi");


    // Select two products using loop
    // Product names are stored in an array

    const products = [
        "Sauce Labs Onesie",
        "Sauce Labs Bolt T-Shirt"
    ];

    for (const productName of products) {

        const productButton =
            `//div[text()="${productName}"]/ancestor::div[@class="inventory_item"]//button`;

        await page.locator(productButton).click();
    }

    // Verify cart badge displays 2
    await expect(page.locator('//span[@class="shopping_cart_badge"]'))
        .toHaveText("2");


    // Step 3: Verify Shopping Cart

    // Click shopping cart
    await page.locator('//a[@data-test="shopping-cart-link"]')
        .click();

    // Verify cart page URL
    await expect(page)
        .toHaveURL("https://www.saucedemo.com/cart.html");

    // Verify Your Cart
    await expect(page.locator('//span[text()="Your Cart"]'))
        .toHaveText("Your Cart");


    // Verify both selected products using loop

    for (const productName of products) {

        const productLocator =
            `//div[@class="inventory_item_name" and text()="${productName}"]`;

        await expect(page.locator(productLocator))
            .toBeVisible();
    }


    // Verify product prices using loop

    const prices = [
        "7.99",
        "15.99"
    ];

    for (const price of prices) {

        const priceLocator =
            `//div[@class="inventory_item_price" and text()="$${price}"]`;

        await expect(page.locator(priceLocator))
            .toBeVisible();
    }


    // Click Checkout
    await page.locator('//button[@id="checkout"]')
        .click();


    // Step 4: Enter Checkout Information

    // First Name
    await page.locator('//input[@id="first-name"]')
        .fill("Gopinath");

    // Last Name
    await page.locator('//input[@id="last-name"]')
        .fill("N");

    // Postal Code
    await page.locator('//input[@placeholder="Zip/Postal Code"]')
        .fill("624613");

    // Click Continue
    await page.locator('//input[@id="continue"]')
        .click();


    // Verify Checkout: Overview page
    await expect(page)
        .toHaveURL("https://www.saucedemo.com/checkout-step-two.html");

    await expect(page.locator('//span[text()="Checkout: Overview"]'))
        .toHaveText("Checkout: Overview");


    // Verify Payment Information
    await expect(page.locator('//div[text()="Payment Information:"]'))
        .toHaveText("Payment Information:");

    await expect(page.locator('//div[text()="SauceCard #31337"]'))
        .toBeVisible();


    // Verify Shipping Information
    await expect(page.locator('//div[text()="Shipping Information:"]'))
        .toHaveText("Shipping Information:");

    await expect(page.locator('//div[text()="Free Pony Express Delivery!"]'))
        .toBeVisible();


    // Verify Total Price
    await expect(page.locator('//div[@class="summary_total_label"]'))
        .toHaveText("Total: $25.90");


    // Step 5: Confirm Order

    // Click Finish
    await page.locator('//button[@id="finish"]')
        .click();

    // Verify order confirmation page
    await expect(page)
        .toHaveURL("https://www.saucedemo.com/checkout-complete.html");

    await expect(page.locator('//span[text()="Checkout: Complete!"]'))
        .toHaveText("Checkout: Complete!");


    // Verify success image
    await expect(page.locator('//img[@data-test="pony-express"]'))
        .toBeVisible();


    // Verify success message
    await expect(page.locator('//h2[text()="Thank you for your order!"]'))
        .toHaveText("Thank you for your order!");


    // Click Back Home
    await page.locator('//button[@id="back-to-products"]')
        .click();

    // Verify Products page
    await expect(page)
        .toHaveURL("https://www.saucedemo.com/inventory.html");

    await expect(page.locator('//span[text()="Products"]'))
        .toHaveText("Products");


    // Step 6: Logout

    // Verify current URL before logout
    await expect(page)
        .toHaveURL("https://www.saucedemo.com/inventory.html");

    // Click menu icon
    await page.locator('//button[@id="react-burger-menu-btn"]')
        .click();

    // Click Logout
    await page.locator('//a[@id="logout_sidebar_link"]')
        .click();

    // Verify Login page URL
    await expect(page)
        .toHaveURL("https://www.saucedemo.com/");

    // Verify Login page is displayed
    await expect(page.locator('//input[@placeholder="Username"]'))
        .toBeVisible();

});// Idhu chat gpt code dont try okaya!!!!!
