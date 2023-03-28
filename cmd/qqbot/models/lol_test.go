package models

import (
	"fmt"
	"testing"
)

func TestLOLBattle_ToBattles(t *testing.T) {
	l := LOLBattle{}
	s := l.ToBattles([]byte(`[
        {
            "game_id": "7806982417",
            "game_start_time": "1679729857642",
            "game_time_played": 1475,
            "map_id": 11,
            "game_queue_id": 430,
            "was_mvp": 0,
            "was_svp": 0,
            "was_early_surrender": 0,
            "play_gt25_mask": 0,
            "game_server_version": "",
            "champion_id": 131,
            "position": "JUNGLE",
            "skin_index": 0,
            "game_score": 100875,
            "team_id": "100",
            "win": "Win",
            "kills": 8,
            "deaths": 5,
            "assists": 8,
            "gold_earned": 11394,
            "was_surrender": 1,
            "was_afk": 0,
            "most_kills": 0,
            "most_assists": 0,
            "most_minions_killed": 0,
            "most_gold_earned": 0,
            "most_damage_dealt_to_champions": 0,
            "most_total_damage_taken": 0,
            "most_turrets_killed": 1,
            "double_kills": 1,
            "triple_kills": 0,
            "quadra_kills": 0,
            "penta_kills": 0,
            "unreal_kills": 0,
            "game_level": "{\"tier\":\"1\",\"league_points\":\"43\",\"rank\":\"3\"}",
            "win_with_less_teammate": 0,
            "team_made_size": 5,
            "battle_type": 256
        },
        {
            "game_id": "7806877200",
            "game_start_time": "1679727738381",
            "game_time_played": 1895,
            "map_id": 11,
            "game_queue_id": 430,
            "was_mvp": 0,
            "was_svp": 0,
            "was_early_surrender": 0,
            "play_gt25_mask": 1,
            "game_server_version": "",
            "champion_id": 134,
            "position": "MIDDLE",
            "skin_index": 0,
            "game_score": 79731,
            "team_id": "200",
            "win": "Win",
            "kills": 9,
            "deaths": 5,
            "assists": 11,
            "gold_earned": 13593,
            "was_surrender": 0,
            "was_afk": 0,
            "most_kills": 0,
            "most_assists": 0,
            "most_minions_killed": 0,
            "most_gold_earned": 0,
            "most_damage_dealt_to_champions": 0,
            "most_total_damage_taken": 0,
            "most_turrets_killed": 0,
            "double_kills": 1,
            "triple_kills": 0,
            "quadra_kills": 0,
            "penta_kills": 0,
            "unreal_kills": 0,
            "game_level": "{\"tier\":\"1\",\"league_points\":\"43\",\"rank\":\"3\"}",
            "win_with_less_teammate": 0,
            "team_made_size": 5,
            "battle_type": 256
        }
    ]`))
	fmt.Println(s)
}
