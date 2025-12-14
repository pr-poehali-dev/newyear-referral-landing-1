import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import date

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Счётчик посетителей: отслеживание визитов на сайт
    Args: event - запрос с httpMethod (GET для получения, POST для регистрации визита)
    Returns: JSON с общим количеством посетителей
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            is_unique = body_data.get('unique', False)
            
            today = date.today().isoformat()
            
            if is_unique:
                cur.execute(
                    "INSERT INTO visitor_stats (visit_date, visit_count, unique_visitors) "
                    "VALUES (%s, 1, 1) "
                    "ON CONFLICT (visit_date) DO UPDATE SET "
                    "visit_count = visitor_stats.visit_count + 1, "
                    "unique_visitors = visitor_stats.unique_visitors + 1",
                    (today,)
                )
            else:
                cur.execute(
                    "INSERT INTO visitor_stats (visit_date, visit_count, unique_visitors) "
                    "VALUES (%s, 1, 0) "
                    "ON CONFLICT (visit_date) DO UPDATE SET "
                    "visit_count = visitor_stats.visit_count + 1",
                    (today,)
                )
            
            conn.commit()
        
        cur.execute("SELECT SUM(visit_count) as total, SUM(unique_visitors) as unique_total FROM visitor_stats")
        result = cur.fetchone()
        
        total_visitors = int(result['total']) if result and result['total'] else 0
        unique_total = int(result['unique_total']) if result and result['unique_total'] else 0
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'total': total_visitors,
                'unique': unique_total
            }),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
