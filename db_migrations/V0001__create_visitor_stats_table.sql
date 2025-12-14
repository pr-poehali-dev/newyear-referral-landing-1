CREATE TABLE IF NOT EXISTS visitor_stats (
    id SERIAL PRIMARY KEY,
    visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
    visit_count INTEGER NOT NULL DEFAULT 0,
    unique_visitors INTEGER NOT NULL DEFAULT 0,
    UNIQUE(visit_date)
);

CREATE INDEX idx_visit_date ON visitor_stats(visit_date DESC);

INSERT INTO visitor_stats (visit_date, visit_count, unique_visitors) 
VALUES (CURRENT_DATE, 0, 0)
ON CONFLICT (visit_date) DO NOTHING;