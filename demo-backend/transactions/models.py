from django.db import models

# Create your models here.
class Transactions(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField(null=True)
    created_at = models.DateTimeField(null=True)
    status = models.TextField(null=True)
    total_amount = models.BigIntegerField(null=True)
    discount_amount = models.IntegerField(null=True)
    discount_percentage = models.DecimalField(decimal_places=4, max_digits=8,null=True)
    merchant_network_id  = models.TextField(null=True)
    merchant_category = models.TextField(null=True)
    flagged_reason = models.TextField(null=True)