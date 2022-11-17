from django.urls import path
from . import views


urlpatterns = [
    path("", views.contactList, name="contactList"),
    path("search/", views.searchContacts, name="searchContacts"),
    path("create/", views.createContact, name="createContact"),
    path("edit/<str:pk>/", views.editContact, name="editContact"),
    path("delete/<str:pk>/", views.deleteContact, name="deleteContact"), 
    path("tools/", views.useTools, name="useTools"),
    path("sort/<str:key>/", views.sortContacts, name="sortContacts") 
]