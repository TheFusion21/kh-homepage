import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineRight,
} from 'react-icons/ai';
import AnimateHeight from 'react-animate-height';


interface MenuEntry {
  name?: string;
  link?: string;
  subMenu?: MenuEntry[];
}
const menuStructure: MenuEntry[] = [
  {
    name: 'Free to Play',
    link: '/genre/Free%20to%20Play',
  },
  {
    name: 'Early Access',
    link: '/genre/Early%20Access',
  },
  {

  },
  {
    name: 'Action',
    subMenu: [
      {
        name: 'Arcade & Rythm',
        link: '/category/arcade_rhythm',
      },
      {
        name: 'Fighting & Martial Arts',
        link: '/category/fighting_martial_arts',
      },
      {
        name: 'First-Person Shooter',
        link: '/category/action_fps',
      },
      {
        name: 'Hack & Slash',
        link: '/category/hack_and_slash',
      },
      {
        name: 'Platformer & Runner',
        link: '/category/action_run_jump',
      },
      {
        name: 'Third-Person Shooter',
        link: '/category/action_tps',
      },
      {
        name: 'shmup',
        link: '/category/shump',
      },
    ]
  },
  {
    name: 'Adventure',
    subMenu: [
      {
        name: 'Adventure RPG',
        link: '/category/adventure_rpg',
      },
      {
        name: 'Casual',
        link: '/category/casual',
      },
      {
        name: 'Hidden Object',
        link: '/category/hidden_object',
      },
      {
        name: 'Metroidvania',
        link: '/category/metroidvania',
      },
      {
        name: 'Puzzle',
        link: '/category/puzzle_matching',
      },
      {
        name: 'Story-Rich',
        link: '/category/story_rich',
      },
      {
        name: 'Visual Novel',
        link: '/category/visual_novel',
      },
    ]
  },
  {
    name: 'Role-Playing',
    subMenu: [
      {
        name: 'Action RPG',
        link: '/category/rpg_action',
      },
      {
        name: 'Adventure RPG',
        link: '/category/adventure_rpg',
      },
      {
        name: 'JRPG',
        link: '/category/rpg_jrpg',
      },
      {
        name: 'Party-Based',
        link: '/category/rpg_party_based',
      },
      {
        name: 'Rogue-Like',
        link: '/category/rogue_like_rogue_lite',
      },
      {
        name: 'Sandbox RPG',
        link: '/category/rpg_strategy_tactics',
      },
      {
        name: 'Turn-Based',
        link: '/category/rpg_turn_based',
      }
    ]
  },
  {
    name: 'Simulation',
    subMenu: [
      {
        name: 'Building & Automation',
        link: '/category/sim_building_automation',
      },
      {
        name: 'Dating',
        link: '/category/sim_dating',
      },
      {
        name: 'Farming & Crafting',
        link: '/category/sim_farming_crafting',
      },
      {
        name: 'Hobby & Job',
        link: 'sim_hobby_sim',
      },
      {
        name: 'Life & Immersive',
        link: '/category/sim_life',
      },
      {
        name: 'Physics & Sandbox',
        link: '/category/sim_physics_sandbox',
      },
      {
        name: 'Space & Flight',
        link: '/category/sim_space_flight',
      }
    ]
  },
  {
    name: 'Strategy',
    subMenu: [
      {
        name: 'Card & Board',
        link: '/category/strategy_card_board',
      },
      {
        name: 'Cities & Settlements',
        link: '/category/strategy_cities_settlements',
      },
      {
        name: 'Grand & 4X',
        link: '/category/strategy_grand_4x',
      },
      {
        name: 'Military',
        link: '/category/strategy_military',
      },
      {
        name: 'Real-Time Strategy',
        link: '/category/strategy_real_time',
      },
      {
        name: 'Tower Defense',
        link: '/category/tower_defense',
      },
      {
        name: 'Turn-Based Strategy',
        link: '/category/strategy_turn_based',
      }
    ]
  },
  {
    name: 'Sports & Racing',
    subMenu: [
      {
        name: 'All Sports',
        link: 'category/sports',
      },
      {
        name: 'Fishing & Hunting',
        link: '/category/sports_fishing_hunting',
      },
      {
        name: 'Individual Sports',
        link: 'sports_individual',
      },
      {
        name: 'Racing',
        link: '/category/racing',
      },
      {
        name: 'Racing Sim',
        link: '/category/racing_simulation',
      },
      {
        name: 'Sports Sim',
        link: '/category/sports_simulation',
      },
      {
        name: 'Team Sports',
        link: '/category/sports_team',
      }
    ]
  },
  {
    name: 'Themes',
    subMenu: [
      {
        name: 'Anime',
        link: '/category/anime',
      },
      {
        name: 'Horror',
        link: '/category/horror',
      },
      {
        name: 'Mystery & Detective',
        link: '/category/mystery_detective',  
      },
      {
        name: 'Open World',
        link: '/category/exploration_open_world',
      },
      {
        name: 'Sci-Fi & Cyberpunk',
        link: '/category/science_fiction',
      },
      {
        name: 'Space',
        link: '/category/space',
      },
      {
        name: 'Survival',
        link: '/category/survival',
      }
    ]
  },
  {
    name: 'Player Support',
    subMenu: [
      {
        name: 'Co-Operative',
        link: '/category/multiplayer_coop',
      },
      {
        name: 'LAN',
        link: '/category/multiplayer_lan',
      },
      {
        name: 'Local & Party',
        link: '/category/multiplayer_local',
      },
      {
        name: 'MMO',
        link: '/category/multiplayer_mmo',
      },
      {
        name: 'Multiplayer',
        link: '/category/multiplayer',
      },
      {
        name: 'Online Competitive',
        link: '/category/multiplayer_online_competitive',
      },
      {
        name: 'Singleplayer',
        link: '/category/singleplayer',
      }
    ]
  }
];

const SubMenu = ({ menuEntry, onClick, isExpanded } : { menuEntry: MenuEntry, onClick: (open: boolean) => void, isExpanded: boolean }) => {

  const handleClick = useCallback(() => {
    onClick(!isExpanded);
  }, [isExpanded, onClick]);
  
  if (!('name' in menuEntry) ) {
    return <li className="flex min-h-[10px] flex-col md:hidden" />;
  }
  return (
    <li className="flex min-h-[40px] flex-col" key={menuEntry.name}>
      {menuEntry.link ? (
        <Link to={menuEntry.link} className="py-2 px-4 hover:bg-white/10 font-semibold whitespace-nowrap">
          {menuEntry.name}
        </Link>
      ) : (
        <span
          className={`py-2 px-4 justify-between flex cursor-pointer hover:bg-white/10 font-semibold whitespace-nowrap ${isExpanded ? 'bg-white/10' : ''}`}
          onClick={handleClick}
        >
          {menuEntry.name}
          <AiOutlineRight className="inline-block ml-2 w-5 h-5 transition-transform motion-reduce:transition-none duration-300 text-white/50" style={{ transform: `rotate(${isExpanded ? 90 : 0}deg)` }} />
        </span>
      )}
      {menuEntry.subMenu && (
        <AnimateHeight
          height={isExpanded ? 'auto' : 0}
          duration={200}
        >
          <ul className="flex flex-col bg-slate-600">
            {menuEntry.subMenu.map((subEntry, j) => (
              <li className="flex min-h-[40px] flex-col whitespace-nowrap" key={subEntry.name}>
                <Link to={subEntry.link} className="py-2 px-4 hover:bg-white/10">
                  {subEntry.name}
                </Link>
              </li>
            ))}
          </ul>
        </AnimateHeight>
      )}
    </li>
  )
}

const CategoriesMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState<boolean[]>([...Array(menuStructure.length)].map(() => false));

  const handleSubMenuClick = useCallback((index: number, o: boolean) => {
    if (!o) {
      setSubMenuOpen((prev) => {
        const copy = [...prev];
        copy[index] = false;
        return copy;
      });
    } else {
      // close all other menus
      setSubMenuOpen((prev) => {
        const copy = [...prev];
        copy.fill(false);
        copy[index] = true;
        return copy;
      });
    }
  }, [subMenuOpen]);

  return (
    <li className="flex flex-col">
      <span
        className={`py-2 px-4 justify-between hover:bg-white/10 font-semibold cursor-pointer h-full flex items-center ${isExpanded ? 'bg-white/10' : ''}`}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        Categories
        <AiOutlineRight className="inline-block ml-2 w-5 h-5 transition-transform motion-reduce:transition-none duration-300 text-white/50" style={{ transform: `rotate(${isExpanded ? 90 : 0}deg)` }} />
      </span>
      <AnimateHeight
        height={isExpanded ? 'auto' : 0}
        duration={300}
        className="md:absolute top-16 left-0 right-0 md:bg-slate-600 md:shadow-lg max-w-5xl md:mx-auto md:-z-10"
      >
        <ul className="flex flex-col md:grid md:grid-cols-4 md:px-4 md:py-2">
          {menuStructure.map((entry, i) => (
            <SubMenu
              key={entry.name ?? `space_${i}`}
              menuEntry={entry}
              isExpanded={subMenuOpen[i]}
              onClick={(o) => handleSubMenuClick(i, o)}
            />
          ))}
        </ul>
      </AnimateHeight>
    </li>
  );
}

const PageHeader = () => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = useCallback(() => {
    if (search) {
      navigate(`/search/${search}`);
    }
  }, [search]);

  const handleSearchReturnDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  }, [handleSearchClick]);

  return (
    <header className="w-full md:bg-steam-black z-20 fixed">
      <ul className="w-full max-w-5xl flex flex-col md:h-16 md:flex-row md:mx-auto md:items-center md:shadow-lg">
        {/* Menu Button for mobile */}
        <li className="shadow-lg bg-steam-black text-steam-white z-10 h-12 md:h-16 md:shadow-none md:hidden">
          <ul className="flex flex-row items-center justify-start relative md:static">
            {/* Logo */}
            <li className="absolute md:static mx-auto left-0 right-0 top-0">
              <img
                src="https://store.akamai.steamstatic.com/public/shared/images/responsive/header_logo.png"
                alt="Steam Logo"
                className="h-12 p-2 md:h-16 md:p-4 mx-auto"
              />
            </li>
            <li className="z-10 left-0">
              <button className="hover:bg-white/10" onClick={() => setMenuOpen((prev) => !prev)}>
                <AiOutlineMenu className="w-12 h-12 p-3" />
              </button>
            </li>
          </ul>
        </li>
        <li className={`grow bg-steam-black text-steam-white transition-transform md:transition-none motion-reduce:transition-none md:h-16 md:px-2 ${menuOpen ? '' : 'mobile-transform'}`}>
          <ul className="flex flex-col md:flex-row h-full items-stretch">
            <li className="hidden md:block">
              <img
                src="https://store.akamai.steamstatic.com/public/shared/images/responsive/header_logo.png"
                alt="Steam Logo"
                className="h-16 p-4"
              />
            </li>
            <li>
              <Link to="/" className="py-2 px-4 hover:bg-white/10 font-semibold h-full flex items-center">
                Home
              </Link>
            </li>
            <CategoriesMenu />
            <li className="md:grow" />
            <li className="flex flex-row items-center">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="grow justify-center items-center outline-none bg-white/5 px-2 py-2 md h-10 md:h-auto"
                onKeyDown={handleSearchReturnDown}
              />
              <AiOutlineSearch
                className="w-10 h-10 p-1 bg-white/5 cursor-pointer" 
                onClick={handleSearchClick}
              />
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
};

export default PageHeader;