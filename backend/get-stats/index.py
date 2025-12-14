import json
import os
import psycopg2
from typing import Dict, Any, List
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Функция возвращает статистику кликов по банкам и ссылкам
    Args: event - HTTP запрос
          context - контекст выполнения функции
    Returns: HTTP ответ со статистикой переходов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL', '')
    conn = psycopg2.connect(dsn)
    
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT 
                    bank_name,
                    link_name,
                    link_url,
                    COUNT(*) as click_count,
                    MAX(clicked_at) as last_click
                FROM t_p45436286_newyear_referral_lan.link_clicks
                GROUP BY bank_name, link_name, link_url
                ORDER BY click_count DESC
            """)
            
            rows = cur.fetchall()
            
            stats_by_bank: Dict[str, Any] = {}
            total_clicks = 0
            
            for row in rows:
                bank_name, link_name, link_url, click_count, last_click = row
                total_clicks += click_count
                
                if bank_name not in stats_by_bank:
                    stats_by_bank[bank_name] = {
                        'bank_name': bank_name,
                        'total_clicks': 0,
                        'links': []
                    }
                
                stats_by_bank[bank_name]['total_clicks'] += click_count
                stats_by_bank[bank_name]['links'].append({
                    'link_name': link_name,
                    'link_url': link_url,
                    'click_count': click_count,
                    'last_click': last_click.isoformat() if last_click else None
                })
            
            cur.execute("""
                SELECT COUNT(*) as today_clicks
                FROM t_p45436286_newyear_referral_lan.link_clicks
                WHERE DATE(clicked_at) = CURRENT_DATE
            """)
            today_clicks = cur.fetchone()[0]
            
            result = {
                'total_clicks': total_clicks,
                'today_clicks': today_clicks,
                'banks': sorted(stats_by_bank.values(), key=lambda x: x['total_clicks'], reverse=True)
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False),
            'isBase64Encoded': False
        }
    finally:
        conn.close()
