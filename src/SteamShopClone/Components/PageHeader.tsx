import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

const PageHeader = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 250);

  return (
    <header className="w-full">
      <ul className="w-full flex flex-col md:flex-row max-w-4xl mx-auto bg-gradient-to-r from-sky-600 to-sky-800 text-sky-50">
        <li className="flex flex-col">
          <Link to="/" className="p-2 hover:bg-white/10 font-semibold">
            Home
          </Link>
        </li>
        <li className="flex flex-col">
          <span className="p-2 cursor-pointer hover:bg-white/10 font-semibold">
            Categories
          </span>
          <ul className="hidden">
            <li>
              <Link to="/genre/Free%20to%20Play">Free to Play</Link>
            </li>
            <li>
              <Link to="/genre/Early%20Access">Early Access</Link>
            </li>
            <li>
              {/* space */}
            </li>
            <li>
              Action
              <ul>
                <li>
                  <Link to="/category/arcade_rhythm">Arcade & Rythm</Link>
                </li>
                <li>
                  <Link to="/category/fighting_martial_arts">Fighting & Martial Arts</Link>
                </li>
                <li>
                  <Link to="/category/action_fps">First-Person Shooter</Link>
                </li>
                <li>
                  <Link to="/category/hack_and_slash">Hack & Slash</Link>
                </li>
                <li>
                  <Link to="/category/action_run_jump">Platformer & Runner</Link>
                </li>
                <li>
                  <Link to="/category/action_tps">Third-Person Shooter</Link>
                </li>
                <li>
                  <Link to="/category/shump">shmup</Link>
                </li>
              </ul>
            </li>
            <li>
              Adventure
              <ul>
                <li>
                  <Link to="/category/adventure_rpg">Adventure RPG</Link>
                </li>
                <li>
                  <Link to="/category/casual">Casual</Link>
                </li>
                <li>
                  <Link to="/category/hidden_object">Hidden Object</Link>
                </li>
                <li>
                  <Link to="/category/metroidvania">Metroidvania</Link>
                </li>
                <li>
                  <Link to="/category/puzzle_matching">Puzzle</Link>
                </li>
                <li>
                  <Link to="/category/story_rich">Story-Rich</Link>
                </li>
                <li>
                  <Link to="/category/visual_novel">Visual Novel</Link>
                </li>
              </ul>
            </li>
            <li>
              Role-Playing
              <ul>
                <li>
                  <Link to="/category/rpg_action">Action RPG</Link>
                </li>
                <li>
                  <Link to="/category/adventure_rpg">Adventure RPG</Link>
                </li>
                <li>
                  <Link to="/category/rpg_jrpg">JRPG</Link>
                </li>
                <li>
                  <Link to="/category/rpg_party_based">Party-Based</Link>
                </li>
                <li>
                  <Link to="/category/rogue_like_rogue_lite">Rogue-Like</Link>
                </li>
                <li>
                  <Link to="/category/rpg_strategy_tactics">Strategy RPG</Link>
                </li>
                <li>
                  <Link to="/category/rpg_turn_based">Turn-Based</Link>
                </li>
              </ul>
            </li>
            <li>
              Simulation
              <ul>
                <li>
                  <Link to="/category/sim_building_automation">Building & Automation</Link>
                </li>
                <li>
                  <Link to="/category/sim_dating">Dating</Link>
                </li>
                <li>
                  <Link to="/category/sim_farming_crafting">Farming & Crafting</Link>
                </li>
                <li>
                  <Link to="/category/sim_hobby_sim">Hobby & Job</Link>
                </li>
                <li>
                  <Link to="/category/sim_life">Life & Immersive</Link>
                </li>
                <li>
                  <Link to="/category/sim_physics_sanbox">Physics & Sandbox</Link>
                </li>
                <li>
                  <Link to="/category/sim_space_flight">Space & Flight</Link>
                </li>
              </ul>
            </li>
            <li>
              Strategy
              <ul>
                <li>
                  <Link to="/category/strategy_card_board">Card & Board</Link>
                </li>
                <li>
                  <Link to="/category/strategy_cities_settlements">Cities & Settlements</Link>
                </li>
                <li>
                  <Link to="/category/strategy_grand_4x">Grand & 4X</Link>
                </li>
                <li>
                  <Link to="/category/strategy_military">Military</Link>
                </li>
                <li>
                  <Link to="/category/strategy_real_time">Real-Time Strategy</Link>
                </li>
                <li>
                  <Link to="/category/tower_defense">Tower Defense</Link>
                </li>
                <li>
                  <Link to="/category/strategy_turn_based">Turn-Based Strategy</Link>
                </li>
              </ul>
            </li>
            <li>
              Sports & Racing
              <ul>
                <li>
                  <Link to="/category/sports">All Sports</Link>
                </li>
                <li>
                  <Link to="/category/sports_fishing_hunting">Fishing & Hunting</Link>
                </li>
                <li>
                  <Link to="/category/sports_individual">Individual Sports</Link>
                </li>
                <li>
                  <Link to="/category/racing">Racing</Link>
                </li>
                <li>
                  <Link to="/category/racing_simulation">Racing Sim</Link>
                </li>
                <li>
                  <Link to="/category/sports_simulation">Sports Sim</Link>
                </li>
                <li>
                  <Link to="/category/sports_team">Team Sports</Link>
                </li>
              </ul>
            </li>
            <li>
              Themes
              <ul>
                <li>
                  <Link to="/category/anime">Anime</Link>
                </li>
                <li>
                  <Link to="/category/horror">Horror</Link>
                </li>
                <li>
                  <Link to="/category/mystery_detective">Mystery & Detective</Link>
                </li>
                <li>
                  <Link to="/category/exploration_open_world">Open World</Link>
                </li>
                <li>
                  <Link to="/category/science_fiction">Sci-Fi & Cyberpunk</Link>
                </li>
                <li>
                  <Link to="/category/space">Space</Link>
                </li>
                <li>
                  <Link to="/category/survival">Survival</Link>
                </li>
              </ul>
            </li>
            <li>
              Player Support
              <ul>
                <li>
                  <Link to="/category/multiplayer_coop">Co-Operative</Link>
                </li>
                <li>
                  <Link to="/category/multiplayer_lan">LAN</Link>
                </li>
                <li>
                  <Link to="/category/multiplayer_local">Local & Party</Link>
                </li>
                <li>
                  <Link to="/category/multiplayer_mmo">MMO</Link>
                </li>
                <li>
                  <Link to="/category/multiplayer">Multiplayer</Link>
                </li>
                <li>
                  <Link to="/category/multiplayer_online_competitive">Online Competitive</Link>
                </li>
                <li>
                  <Link to="/category/singleplayer">Singleplayer</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="md:grow" />
        <li className="p-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </li>
      </ul>
    </header>
  );
};

export default PageHeader;