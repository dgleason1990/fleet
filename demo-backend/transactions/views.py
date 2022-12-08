from django.shortcuts import HttpResponse, render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.db import connection
import json

# Create your views here.
@api_view(['GET'])
def get_transactions(request):

    provider = request.GET.get('provider')
    if provider is not None:
        where = f"WHERE name LIKE '%%{provider}%%'"
    else:
        where = None
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT total_amount FROM transactions_transactions {where} ORDER BY created_at ASC")
        result = cursor.fetchall()
        spending = []
        for i, row in enumerate(result):
            spending.append([i,row[0]])

    
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT * FROM transactions_transactions {where} ORDER BY id ASC")
        columns = cursor.description
        transactions = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]

    response = {
        'spending': spending,
        'transactions': transactions
    }
    return JsonResponse(response)

@api_view(['POST'])
def flagged_transaction(request):
    reason = request.data['reason']
    id = request.data['id']
    try:
        with connection.cursor() as cursor:
            cursor.execute(f"UPDATE transactions_transactions SET flagged_reason = '{reason}' WHERE id = {id}")
        return HttpResponse(200)
    except Exception as e:
        return HttpResponse(500)