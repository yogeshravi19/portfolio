import time
import getpass
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def scrape_linkedin():
    print("=== Comprehensive LinkedIn Profile Scraper ===")
    username = input("Enter your LinkedIn email: ")
    password = getpass.getpass("Enter your LinkedIn password: ")
    profile_url_input = input("Enter your profile URL (e.g., https://www.linkedin.com/in/yogesh-ravi-m-397569310): ")
    
    # Standardize profile URL
    profile_url = profile_url_input.strip()
    if profile_url.endswith('/'):
        profile_url = profile_url[:-1]
        
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    
    try:
        # 1. Login
        print("\nLogging in...")
        driver.get("https://www.linkedin.com/login")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username"))).send_keys(username)
        driver.find_element(By.ID, "password").send_keys(password + Keys.RETURN)
        
        # Give enough time in case of 2FA or Captchas
        time.sleep(10)  
        
        with open("linkedin_export.txt", "w", encoding="utf-8") as f:
            f.write("=== LINKEDIN EXPORT ===\n\n")
            
            # 2. Experience
            print("Scraping Experience...")
            f.write("--- WORK EXPERIENCE ---\n")
            driver.get(f"{profile_url}/details/experience/")
            time.sleep(5)
            # Scroll down to load all items
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(3)
            # Find list items for experience
            exp_items = driver.find_elements(By.CSS_SELECTOR, "li.pvs-list__paged-list-item")
            for item in exp_items:
                f.write(item.text.strip() + "\n\n")
                
            # 3. Certificates
            print("Scraping Certificates...")
            f.write("--- CERTIFICATES ---\n")
            driver.get(f"{profile_url}/details/certifications/")
            time.sleep(5)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(3)
            cert_items = driver.find_elements(By.CSS_SELECTOR, "li.pvs-list__paged-list-item")
            for item in cert_items:
                f.write(item.text.strip() + "\n\n")
                
            # 4. Posts
            print("Scraping Posts...")
            f.write("--- POSTS ---\n")
            driver.get(f"{profile_url}/recent-activity/shares/")
            time.sleep(5)
            for _ in range(4): # Scroll a few times to get more posts
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(3)
            post_items = driver.find_elements(By.CSS_SELECTOR, ".feed-shared-update-v2__description-wrapper, .update-components-text")
            for i, post in enumerate(post_items, 1):
                text = post.text.strip()
                if text:
                    f.write(f"Post {i}:\n{text}\n\n")
            
        print("\nScraping complete! Check linkedin_export.txt in this folder.")

    except Exception as e:
        print(f"An error occurred: {e}. If it failed to find elements, make sure you resolved any CAPTCHAs before the script continues.")
    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_linkedin()
