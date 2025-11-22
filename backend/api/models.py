from django.db import models
import uuid
# Create your models here.
class Transaction(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False , primary_key=True)
    text = models.CharField(max_length=255)
    amount = models.DecimalField(decimal_places=2 , max_digits=10)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.text} ({self.amount})"
