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
  contacts = Contact.objects.filter(Q(telephonNumber__icontains=key) | Q(name__icontains=key) | Q(profession__icontains=key))
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
