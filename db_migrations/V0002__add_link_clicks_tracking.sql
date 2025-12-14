-- Create table for tracking link clicks
CREATE TABLE IF NOT EXISTS t_p45436286_newyear_referral_lan.link_clicks (
    id SERIAL PRIMARY KEY,
    bank_name VARCHAR(100) NOT NULL,
    link_name VARCHAR(200) NOT NULL,
    link_url TEXT NOT NULL,
    clicked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    referrer TEXT
);

-- Create index for faster queries by bank and date
CREATE INDEX idx_link_clicks_bank ON t_p45436286_newyear_referral_lan.link_clicks(bank_name);
CREATE INDEX idx_link_clicks_date ON t_p45436286_newyear_referral_lan.link_clicks(clicked_at DESC);