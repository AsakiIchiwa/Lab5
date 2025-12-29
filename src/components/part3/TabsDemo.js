import React from 'react';
import Tabs from './Tabs';
import './TabsDemo.css';

// ============================================
// Exercise 3.1: Compound Tabs Component Demo
// ============================================

const TabsDemo = () => {
  return (
    <div className="page-container tabs-demo-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">📑</span>
          Compound Tabs
        </h1>
        <p className="page-subtitle">
          Exercise 3.1: Build flexible compound components using Context
        </p>
      </header>

      <div className="tabs-demo-content">
        {/* Main Demo */}
        <section className="demo-section rpg-panel">
          <h2 className="section-title">Spellbook Tabs</h2>
          
          <Tabs defaultIndex={0}>
            <Tabs.List>
              <Tabs.Tab index={0} icon="🔥">Fire Magic</Tabs.Tab>
              <Tabs.Tab index={1} icon="❄️">Ice Magic</Tabs.Tab>
              <Tabs.Tab index={2} icon="⚡">Lightning</Tabs.Tab>
              <Tabs.Tab index={3} icon="🌿">Nature</Tabs.Tab>
            </Tabs.List>
            
            <div className="tab-divider">
              <span className="divider-rune">✦</span>
              <div className="divider-line"></div>
              <span className="divider-rune">✦</span>
            </div>
            
            <Tabs.Panel index={0}>
              <SpellList 
                type="fire"
                spells={[
                  { name: 'Fireball', mana: 30, damage: '45-60', icon: '🔥' },
                  { name: 'Flame Wave', mana: 45, damage: '35-50 AoE', icon: '🌊' },
                  { name: 'Inferno', mana: 80, damage: '120-150', icon: '💥' },
                  { name: 'Phoenix Rise', mana: 100, damage: 'Revive + 80', icon: '🦅' },
                ]}
              />
            </Tabs.Panel>
            
            <Tabs.Panel index={1}>
              <SpellList 
                type="ice"
                spells={[
                  { name: 'Frost Bolt', mana: 25, damage: '30-45', icon: '❄️' },
                  { name: 'Blizzard', mana: 55, damage: '40-55 AoE', icon: '🌨️' },
                  { name: 'Ice Prison', mana: 40, damage: 'Freeze 5s', icon: '🧊' },
                  { name: 'Absolute Zero', mana: 90, damage: '100-130', icon: '💠' },
                ]}
              />
            </Tabs.Panel>
            
            <Tabs.Panel index={2}>
              <SpellList 
                type="lightning"
                spells={[
                  { name: 'Spark', mana: 15, damage: '20-30', icon: '⚡' },
                  { name: 'Chain Lightning', mana: 50, damage: '35-45 x3', icon: '🔗' },
                  { name: 'Thunder Strike', mana: 70, damage: '80-100', icon: '🌩️' },
                  { name: 'Storm Call', mana: 100, damage: '60-80 AoE', icon: '⛈️' },
                ]}
              />
            </Tabs.Panel>
            
            <Tabs.Panel index={3}>
              <SpellList 
                type="nature"
                spells={[
                  { name: 'Heal', mana: 30, damage: '+50 HP', icon: '💚' },
                  { name: 'Vine Trap', mana: 35, damage: 'Root 4s', icon: '🌿' },
                  { name: 'Regeneration', mana: 45, damage: '+15 HP/s', icon: '🌱' },
                  { name: 'Nature\'s Wrath', mana: 85, damage: '70-90 AoE', icon: '🌳' },
                ]}
              />
            </Tabs.Panel>
          </Tabs>
        </section>

        {/* Second Example with Custom Markup */}
        <section className="demo-section rpg-panel">
          <h2 className="section-title">Guild Tabs (with custom markup)</h2>
          
          <Tabs defaultIndex={0}>
            <div className="custom-tabs-header">
              <span className="header-icon">🏰</span>
              <Tabs.List className="custom-tabs-list">
                <Tabs.Tab index={0} icon="⚔️">Warriors</Tabs.Tab>
                <Tabs.Tab index={1} icon="🧙">Mages</Tabs.Tab>
                <Tabs.Tab index={2} icon="🏹">Rangers</Tabs.Tab>
              </Tabs.List>
              <span className="header-icon">🏰</span>
            </div>
            
            <div className="custom-panel-container">
              <Tabs.Panel index={0} className="guild-panel">
                <GuildInfo 
                  name="Warriors Guild"
                  members={1247}
                  description="Masters of melee combat and defensive tactics. Warriors excel in frontline battles and protecting allies."
                  skills={['Heavy Armor', 'Shield Mastery', 'Battle Cry']}
                />
              </Tabs.Panel>
              
              <Tabs.Panel index={1} className="guild-panel">
                <GuildInfo 
                  name="Mages Guild"
                  members={892}
                  description="Wielders of arcane power and elemental forces. Mages command devastating spells from a safe distance."
                  skills={['Spell Weaving', 'Mana Control', 'Teleportation']}
                />
              </Tabs.Panel>
              
              <Tabs.Panel index={2} className="guild-panel">
                <GuildInfo 
                  name="Rangers Guild"
                  members={1034}
                  description="Expert marksmen and wilderness survivors. Rangers track their prey and strike with deadly precision."
                  skills={['Archery', 'Tracking', 'Animal Companion']}
                />
              </Tabs.Panel>
            </div>
          </Tabs>
        </section>

        {/* Code Example */}
        <section className="code-section rpg-panel">
          <h2 className="section-title">Ancient Scrolls (Code)</h2>
          <pre className="code-block">
{`// Compound Component Pattern with Context
const TabsContext = createContext();

const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);
  
  return (
    <TabsContext.Provider value={{ activeTabIndex, setActiveTabIndex }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
};

// Child components access shared state via Context
Tabs.Tab = ({ children, index }) => {
  const { activeTabIndex, setActiveTabIndex } = useContext(TabsContext);
  const isActive = activeTabIndex === index;
  return (
    <button 
      className={\`tab \${isActive ? 'active' : ''}\`}
      onClick={() => setActiveTabIndex(index)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = ({ children, index }) => {
  const { activeTabIndex } = useContext(TabsContext);
  if (activeTabIndex !== index) return null;
  return <div className="panel">{children}</div>;
};

// Usage - Flexible API!
<Tabs defaultIndex={0}>
  <Tabs.List>
    <Tabs.Tab index={0}>React</Tabs.Tab>
    <Tabs.Tab index={1}>Redux</Tabs.Tab>
  </Tabs.List>
  <div className="custom-divider" /> {/* Custom markup allowed! */}
  <Tabs.Panel index={0}>React content...</Tabs.Panel>
  <Tabs.Panel index={1}>Redux content...</Tabs.Panel>
</Tabs>`}
          </pre>
        </section>
      </div>
    </div>
  );
};

// Spell List Component
const SpellList = ({ type, spells }) => (
  <div className={`spell-list spell-type-${type}`}>
    {spells.map((spell, index) => (
      <div key={index} className="spell-card">
        <span className="spell-icon">{spell.icon}</span>
        <div className="spell-info">
          <h4 className="spell-name">{spell.name}</h4>
          <div className="spell-stats">
            <span className="mana-cost">💎 {spell.mana} MP</span>
            <span className="spell-damage">⚔️ {spell.damage}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Guild Info Component
const GuildInfo = ({ name, members, description, skills }) => (
  <div className="guild-info">
    <h3 className="guild-name">{name}</h3>
    <p className="guild-members">👥 {members.toLocaleString()} Members</p>
    <p className="guild-description">{description}</p>
    <div className="guild-skills">
      <span className="skills-label">Core Skills:</span>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
    </div>
  </div>
);

export default TabsDemo;
