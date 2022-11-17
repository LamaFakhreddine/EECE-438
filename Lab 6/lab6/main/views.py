from django.shortcuts import render, redirect
from .forms import ContactForm
from .models import Contact
from django.db.models import Q



# Create your views here.
def contactList(request):
  contacts = Contact.objects.all()
  context = {
    "contacts": contacts
  }
  return render(request, "contactList.html", context)

def searchContacts(request):
  key = request.GET.get("search")
  contacts = Contact.objects.filter(Q(mobileNumber__icontains=key) | Q(telephonNumber__icontains=key) | Q(name__icontains=key) | Q(profession__icontains=key))
  context = {
    "contacts": contacts
  }
  return render(request, "contactList.html", context)

def sortContacts(request, key):
  contacts = Contact.objects.all().order_by(key)
  context = {
    "contacts": contacts
  }
  return render(request, "contactList.html", context)


def createContact(request):
  if request.method == "POST":
    form = ContactForm(request.POST)
    if form.is_valid():
      print()
      form.save()
      return redirect('contactList')
  
  form = ContactForm()
  context = {
  'form': form
  }

  return render(request, 'create.html', context)


def editContact(request, pk):
    contact = Contact.objects.get(id=pk)
    form = ContactForm(instance=contact)

    if request.method == 'POST':
        form = ContactForm(request.POST, instance=contact)
        if form.is_valid():
            form.save()
            return redirect('contactList')

    context = {
        'contact': contact,
        'form': form,
    }
    return render(request, 'edit.html', context)


def deleteContact(request, pk):
  contact = Contact.objects.get(id=pk)

  if request.method == 'POST':
      contact.delete()
      return redirect('contactList')

  context = {
      'contact': contact,
  }
  return render(request, 'delete.html', context)

def useTools(request):
  if request.method == 'GET':
    name1 = request.GET.get("contact1")
    name2 = request.GET.get("contact2")
    print("name1: " + str(name1))

    isMatch = False 
    contact1 = Contact.objects.filter(name=name1).first()
    contact2 = Contact.objects.filter(name=name2).first()

    if contact1 is not None and contact2 is not None:
      isMatch = contact1.profession == contact2.profession and contact1.telephonNumber == contact2.telephonNumber and contact1.mobileNumber == contact2.mobileNumber

    context = {
      "contact1" : contact1, 
      "contact2" : contact2, 
      "isMatch" : isMatch
    }
    return render(request, 'tools.html', context)

  return render(request, 'tools.html')
