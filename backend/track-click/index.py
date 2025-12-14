import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Функция записывает клики по реферальным ссылкам в базу данных
    Args: event - HTTP запрос с данными о клике
          context - контекст выполнения функции
    Returns: HTTP ответ с результатом записи
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    bank_name = body_data.get('bank_name', '')
    link_name = body_data.get('link_name', '')
    link_url = body_data.get('link_url', '')
    
    if not bank_name or not link_url:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_agent = headers.get('User-Agent', headers.get('user-agent', ''))
    referrer = headers.get('Referer', headers.get('referer', ''))
    
    dsn = os.environ.get('DATABASE_URL', '')
    conn = psycopg2.connect(dsn)
    
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO t_p45436286_newyear_referral_lan.link_clicks "
                "(bank_name, link_name, link_url, user_agent, referrer) "
                "VALUES (%s, %s, %s, %s, %s)",
                (bank_name, link_name, link_url, user_agent, referrer)
            )
            conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    finally:
        conn.close()
