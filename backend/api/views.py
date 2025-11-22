from django.shortcuts import render
from rest_framework import viewsets
from .models import Transaction
from .serializers import TransactionSerializers
# Create your views here.
class TransactionListView(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by("-created_at")
    serializer_class = TransactionSerializers
    lookup_field = "id"