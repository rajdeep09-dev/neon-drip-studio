from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to http://localhost:8080...")
        try:
            page.goto("http://localhost:8080", timeout=60000)
        except Exception as e:
            print(f"Error navigating: {e}")
            browser.close()
            return

        print("Waiting 15 seconds for Preloader to finish...")
        time.sleep(15)  # Wait for preloader animation

        # Look for the new Hero content
        print("Checking for 'Premium • Quality • Coffee •' badge text...")
        try:
            # Look for the text path content
            badge = page.locator("text=Premium • Quality • Coffee •")
            if badge.count() > 0:
                print("SUCCESS: Found badge text!")
            else:
                print("WARNING: Badge text NOT found.")

            # Look for 100% text
            percent = page.locator("text=100%")
            if percent.count() > 0:
                print("SUCCESS: Found '100%' text!")
            else:
                print("WARNING: '100%' text NOT found.")

        except Exception as e:
            print(f"Error checking content: {e}")

        # Take screenshot
        screenshot_path = "verification/coffee_hero_new.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
