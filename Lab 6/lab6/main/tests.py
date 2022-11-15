# #from django.test import TestCase

# # Create your tests here.
# from django.test import LiveServerTestCase
# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys

# # Create your tests here.
# class PlayerFormTest(LiveServerTestCase):

#   def testform(self):
#     driver = webdriver.Chrome(executable_path="C:\\bin\chromedriver")
#     #Choose your url to visit
#     driver.get('http://127.0.0.1:8000/')
#     #find the elements you need to submit form
#     player_name = driver.find_element('name', 'name')
#     player_height = driver.find_element('name', 'height')
#     player_team = driver.find_element('name', 'team')
#     player_ppg = driver.find_element('name', 'ppg')

#     submit = driver.find_element('name', 'submit_button')

#     #populate the form with data
#     player_name.send_keys('Lebron James')
#     player_team.send_keys('Los Angeles Lakers')
#     player_height.send_keys('6 feet 9 inches')
#     player_ppg.send_keys('25.7')

#     #submit form
#     submit.send_keys(Keys.RETURN)

#     #check result; page source looks at entire html document
#     assert 'Lebron James' in driver.page_source

