from playwright.sync_api import sync_playwright

def verify_hero():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Set a large viewport to see the whole hero section
        context = browser.new_context(viewport={"width": 1440, "height": 1200})
        page = context.new_page()

        print("Navigating to http://localhost:8082")
        page.goto("http://localhost:8082")

        # Wait for the main title to be visible
        print("Waiting for 'Coffee Bean' title...")
        page.wait_for_selector("text=Coffee Bean")

        # Wait for animations to settle (and preloader to finish ~4-5s)
        print("Waiting for animations...")
        page.wait_for_timeout(6000)

        # Take a screenshot of the hero section
        # The hero section has the class 'relative z-10 w-full bg-white' (and it's the first section)
        # Or we can just screenshot the top of the page.
        print("Taking screenshot...")
        page.screenshot(path="verification/hero_redesign.png")

        browser.close()
        print("Verification screenshot saved to verification/hero_redesign.png")

if __name__ == "__main__":
    verify_hero()
