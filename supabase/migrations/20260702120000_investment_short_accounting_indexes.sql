create index if not exists investment_accounts_competition_updated_idx
on public.investment_accounts (competition_id, updated_at desc);

create index if not exists investment_accounts_competition_normalized_lookup_idx
on public.investment_accounts (competition_id, normalized_team_name);

create index if not exists investment_trades_team_idx
on public.investment_trades (team_id);

create index if not exists investment_trades_competition_created_idx
on public.investment_trades (competition_id, created_at desc);

create index if not exists investment_trades_position_idx
on public.investment_trades (position_id);

create index if not exists investment_trades_action_created_idx
on public.investment_trades (action, created_at desc);

create index if not exists investment_positions_team_status_idx
on public.investment_positions (team_id, status);

create index if not exists investment_positions_competition_status_side_idx
on public.investment_positions (competition_id, status, side);
