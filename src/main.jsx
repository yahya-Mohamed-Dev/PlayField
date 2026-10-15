import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import ScrollReveal from 'scrollreveal';
import './styles.css';

const games = [
  {
    title: 'STARFALL: ECHOES',
    genre: 'Adventure',
    platform: 'PC',
    tag: 'NEW RELEASE',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1100&q=85',
    description: 'Answer the call of a living galaxy.',
    color: '#b883ff',
  },
  {
    title: 'RIVAL CIRCUIT',
    genre: 'Racing',
    platform: 'PlayStation',
    tag: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=85',
    description: 'Own the night. Rewrite the rules.',
    color: '#ff744d',
  },
  {
    title: 'WILD FRONTIER',
    genre: 'Action',
    platform: 'Xbox',
    tag: 'PLAYER FAVORITE',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1100&q=85',
    description: 'A world untamed. A story yours.',
    color: '#8ad779',
  },
  {
    title: 'NEON LEAGUE',
    genre: 'Sports',
    platform: 'PC',
    tag: 'SEASON LIVE',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1100&q=85',
    description: 'The future of play is wide open.',
    color: '#47d8de',
  },
  {
    title: 'DEEP BLUE',
    genre: 'Adventure',
    platform: 'Nintendo Switch',
    tag: 'EXPLORE NOW',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1100&q=85',
    description: 'Beneath the surface, wonder waits.',
    color: '#65bafa',
  },
  {
    title: 'LAST LIGHT',
    genre: 'Action',
    platform: 'PlayStation',
    tag: 'JUST ANNOUNCED',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=85',
    description: 'When the world goes quiet, begin again.',
    color: '#ffbf70',
  },
];

const stories = [
  { date: 'OCT 14, 2026', category: 'COMMUNITY', title: 'The players shaping what comes next', icon: 'bi-people-fill' },
  { date: 'OCT 08, 2026', category: 'INSIDE PLAYFIELD', title: 'A closer look at the worlds we build', icon: 'bi-stars' },
  { date: 'SEP 29, 2026', category: 'UPDATES', title: 'This month in games: October edition', icon: 'bi-controller' },
];

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('playfield-theme') !== 'light');
  const [activeFilter, setActiveFilter] = useState('All games');
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('playfield-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal('.reveal', {
      distance: '28px',
      duration: 750,
      easing: 'cubic-bezier(.2,.7,.2,1)',
      interval: 90,
      origin: 'bottom',
      reset: false,
      viewFactor: 0.12,
    });
    return () => sr.destroy();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setModal(null);
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const visibleGames = useMemo(() => {
    const query = search.trim().toLowerCase();
    return games.filter((game) => {
      const matchesFilter = activeFilter === 'All games' || game.genre === activeFilter;
      const matchesSearch = !query || `${game.title} ${game.genre} ${game.platform}`.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  const heroSlides = [
    {
      eyebrow: 'THE UNIVERSE IS YOURS',
      title: <>A whole new<br /><span>world awaits.</span></>,
      copy: 'Get lost in the stories, worlds, and adventures waiting to be discovered.',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2200&q=90',
      cta: 'Explore the games',
    },
    {
      eyebrow: 'FIND YOUR NEXT OBSESSION',
      title: <>Play beyond<br /><span>the expected.</span></>,
      copy: 'From high-speed thrills to faraway galaxies, your next favorite is out there.',
      image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2200&q=90',
      cta: 'Browse all games',
    },
    {
      eyebrow: 'MADE FOR THE MOMENT',
      title: <>Your kind<br />of <span>adventure.</span></>,
      copy: 'Pick a world. Rally your crew. Make the kind of memories that stick.',
      image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=2200&q=90',
      cta: 'Find your game',
    },
  ];
  const currentSlide = heroSlides[slide];

  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openGame = (game) => setModal({ type: 'game', game });

  const closeModal = (event) => {
    if (event.target === event.currentTarget) setModal(null);
  };

  return (
    <div className="app-shell">
      <div className="utility-bar">
        <div className="container-fluid utility-inner">
          <a href="#home" className="wordmark mini-mark" aria-label="Playfield home">p<span>·</span>f</a>
          <div className="utility-links">
            <button className="utility-link" onClick={() => setModal({ type: 'signin' })}>Sign in</button>
            <button className="icon-button utility-search" aria-label="Search games" onClick={() => setSearchOpen((open) => !open)}><i className="bi bi-search" /></button>
            <button className="icon-button theme-toggle" aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} onClick={() => setDark((value) => !value)}>
              <i className={`bi ${dark ? 'bi-sun' : 'bi-moon-stars'}`} />
            </button>
          </div>
        </div>
      </div>

      <header className="main-header">
        <div className="container-fluid nav-inner">
          <a href="#home" className="wordmark" aria-label="Playfield home">PLAY<span>FIELD</span><b>®</b></a>
          <nav className={`primary-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a href="#games" onClick={(event) => { event.preventDefault(); scrollToGames(); }}>Games</a>
            <a href="#news" onClick={() => setMenuOpen(false)}>News</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Our world</a>
            <button className="nav-link-button" onClick={() => setModal({ type: 'platforms' })}>Platforms <i className="bi bi-chevron-down" /></button>
          </nav>
          <button className="mobile-menu icon-button" aria-label="Toggle navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} />
          </button>
        </div>
      </header>

      {searchOpen && (
        <form className="search-panel animate__animated animate__fadeInDown" onSubmit={(event) => { event.preventDefault(); scrollToGames(); }}>
          <div className="container search-inner">
            <i className="bi bi-search" />
            <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search games, genres, platforms..." aria-label="Search games" />
            {search && <button type="button" className="clear-search" onClick={() => setSearch('')}>Clear</button>}
            <button type="button" className="icon-button" aria-label="Close search" onClick={() => setSearchOpen(false)}><i className="bi bi-x-lg" /></button>
          </div>
        </form>
      )}

      <main>
        <section id="home" className="hero-section">
          <div className="hero-background" style={{ backgroundImage: `url("${currentSlide.image}")` }} key={slide} />
          <div className="hero-scrim" />
          <div className="container hero-content">
            <div className="hero-copy animate__animated animate__fadeInUp" key={`copy-${slide}`}>
              <div className="eyebrow"><span className="eyebrow-line" />{currentSlide.eyebrow}</div>
              <h1>{currentSlide.title}</h1>
              <p>{currentSlide.copy}</p>
              <button className="button button-primary" onClick={scrollToGames}>{currentSlide.cta}<i className="bi bi-arrow-up-right" /></button>
            </div>
          </div>
          <div className="hero-controls">
            <div className="slide-count"><span>0{slide + 1}</span><div className="slide-track"><i style={{ width: `${((slide + 1) / heroSlides.length) * 100}%` }} /></div><span>0{heroSlides.length}</span></div>
            <div className="slide-buttons">
              <button className="icon-button slide-btn" aria-label="Previous slide" onClick={() => setSlide((slide + heroSlides.length - 1) % heroSlides.length)}><i className="bi bi-arrow-left" /></button>
              <button className="icon-button slide-btn" aria-label="Next slide" onClick={() => setSlide((slide + 1) % heroSlides.length)}><i className="bi bi-arrow-right" /></button>
            </div>
          </div>
          <div className="hero-index">PF — 001</div>
        </section>

        <section id="games" className="games-section section-pad">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />PICK YOUR NEXT ADVENTURE</div>
                <h2>Worlds worth<br /><em>getting lost in.</em></h2>
              </div>
              <a className="text-link desktop-only" href="#games" onClick={(event) => { event.preventDefault(); setShowAll((value) => !value); }}>{showAll ? 'Show featured' : 'View all games'} <i className="bi bi-arrow-up-right" /></a>
            </div>
            <div className="filter-row reveal" role="group" aria-label="Filter games by genre">
              {['All games', 'Action', 'Adventure', 'Racing', 'Sports'].map((filter) => (
                <button key={filter} className={`filter-chip ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>
              ))}
              <span className="results-count">{visibleGames.length} GAMES</span>
            </div>
            <div className="row g-4 game-grid">
              {(showAll ? visibleGames : visibleGames.slice(0, 4)).map((game, index) => (
                <div className="col-12 col-sm-6 col-lg-3 reveal" key={game.title} style={{ '--card-delay': `${index * 80}ms` }}>
                  <article className="game-card" onClick={() => openGame(game)} tabIndex="0" role="button" onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openGame(game); }} aria-label={`Learn more about ${game.title}`}>
                    <div className="game-image-wrap">
                      <img src={game.image} alt="" className="game-image" loading="lazy" />
                      <span className="game-tag" style={{ '--accent': game.color }}>{game.tag}</span>
                      <span className="game-arrow"><i className="bi bi-arrow-up-right" /></span>
                    </div>
                    <div className="game-info">
                      <div className="game-meta">{game.genre}<span />{game.platform}</div>
                      <h3>{game.title}</h3>
                      <p>{game.description}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            {visibleGames.length === 0 && <div className="empty-state"><i className="bi bi-search" /><h3>No games found</h3><p>Try a different title, genre, or platform.</p><button className="button button-outline" onClick={() => { setSearch(''); setActiveFilter('All games'); }}>Clear filters</button></div>}
            {visibleGames.length > 4 && <button className="button button-outline load-more" onClick={() => setShowAll((value) => !value)}>{showAll ? 'Show featured games' : 'Load more games'}<i className={`bi ${showAll ? 'bi-arrow-up' : 'bi-arrow-down'}`} /></button>}
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-image" role="img" aria-label="A person looking out across a mountainous landscape" />
          <div className="feature-copy">
            <div className="eyebrow"><span className="eyebrow-line" />PLAY YOUR WAY</div>
            <h2>Great games.<br /><em>Better together.</em></h2>
            <p>Whether you're here for one more round or a whole new world, there's a place for you in our community.</p>
            <button className="button button-light" onClick={() => setModal({ type: 'community' })}>Meet the community<i className="bi bi-arrow-up-right" /></button>
          </div>
          <div className="feature-counter">01 <span>/ 03</span></div>
        </section>

        <section id="news" className="news-section section-pad">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />THE LATEST</div>
                <h2>News from<br /><em>our worlds.</em></h2>
              </div>
              <button className="text-link desktop-only" onClick={() => setModal({ type: 'news' })}>All news <i className="bi bi-arrow-up-right" /></button>
            </div>
            <div className="row g-4 news-grid">
              {stories.map((story) => (
                <div className="col-12 col-md-4 reveal" key={story.title}>
                  <button className="news-card" onClick={() => setModal({ type: 'story', story })}>
                    <div className="news-art"><i className={`bi ${story.icon}`} /><span>PF / JOURNAL</span></div>
                    <div className="news-details"><div className="news-meta">{story.category}<span>·</span>{story.date}</div><h3>{story.title}</h3><span className="news-open"><i className="bi bi-arrow-up-right" /></span></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="newsletter-section">
          <div className="container newsletter-inner reveal">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" />GOOD THINGS, OCCASIONALLY</div>
              <h2>Stay in the<br /><em>loop.</em></h2>
              <p>News, new worlds, and the occasional surprise. Straight to your inbox.</p>
            </div>
            <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email.includes('@')) setSubscribed(true); }}>
              {subscribed ? (
                <div className="subscribe-success animate__animated animate__fadeIn"><i className="bi bi-check-circle" /><div><strong>You're on the list.</strong><span>Keep an eye on your inbox.</span></div></div>
              ) : (
                <>
                  <label htmlFor="newsletter-email">YOUR EMAIL ADDRESS</label>
                  <div className="email-input-row"><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /><button aria-label="Subscribe to newsletter"><i className="bi bi-arrow-right" /></button></div>
                  <small>By subscribing, you agree to receive occasional Playfield updates. Unsubscribe anytime.</small>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <a href="#home" className="wordmark footer-mark">PLAY<span>FIELD</span><b>®</b></a>
            <div className="footer-links">
              <a href="#games">Games</a><a href="#news">News</a><button onClick={() => setModal({ type: 'support' })}>Support</button><button onClick={() => setModal({ type: 'privacy' })}>Privacy</button>
            </div>
            <div className="social-links">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="bi bi-instagram" /></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="bi bi-youtube" /></a>
              <a href="https://www.twitch.tv/" target="_blank" rel="noreferrer" aria-label="Twitch"><i className="bi bi-twitch" /></a>
            </div>
          </div>
          <div className="footer-bottom"><span>© 2026 PLAYFIELD STUDIO. MADE FOR PLAY.</span><span>BUILT FOR THE LOVE OF GAMES <i className="bi bi-heart-fill" /></span></div>
        </div>
      </footer>

      {modal && (
        <div className="modal-backdrop-custom" role="presentation" onMouseDown={closeModal}>
          <section className="site-modal animate__animated animate__zoomIn animate__faster" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="icon-button modal-close" aria-label="Close dialog" onClick={() => setModal(null)}><i className="bi bi-x-lg" /></button>
            {modal.type === 'game' && <>
              <div className="modal-game-image" style={{ backgroundImage: `url("${modal.game.image}")` }} />
              <div className="modal-content"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />{modal.game.tag}</div><h2 id="modal-title">{modal.game.title}</h2><p>{modal.game.description} Discover a new favorite, meet your next crew, and make this world your own.</p><div className="modal-game-meta"><span>{modal.game.genre}</span><span>{modal.game.platform}</span></div><button className="button button-primary" onClick={() => setModal({ type: 'notify', title: modal.game.title })}>Get game updates<i className="bi bi-arrow-up-right" /></button></div>
            </>}
            {modal.type === 'signin' && <div className="modal-content modal-text"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />YOUR PLAYFIELD</div><h2 id="modal-title">Welcome back.</h2><p>Sign in to keep your games, friends, and favorite worlds close.</p><form className="modal-form" onSubmit={(event) => { event.preventDefault(); setModal({ type: 'message', title: 'Check your inbox', text: 'We sent a secure sign-in link to your email address.' }); }}><label htmlFor="signin-email">EMAIL ADDRESS</label><input type="email" id="signin-email" placeholder="you@example.com" required /><label htmlFor="signin-password">PASSWORD</label><input type="password" id="signin-password" placeholder="Enter your password" required /><button className="button button-primary">Sign in<i className="bi bi-arrow-right" /></button></form><button className="modal-text-link" onClick={() => setModal({ type: 'message', title: 'Password reset', text: 'Enter your email on the sign-in form and we’ll help you get back in.' })}>Forgot your password?</button></div>}
            {modal.type === 'platforms' && <div className="modal-content modal-text"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />PLAY EVERYWHERE</div><h2 id="modal-title">Choose your platform.</h2><p>Find games ready for the way you like to play.</p><div className="platform-options">{['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'].map((platform) => <button key={platform} onClick={() => { setSearch(platform); setSearchOpen(true); setModal(null); scrollToGames(); }}>{platform}<i className="bi bi-arrow-up-right" /></button>)}</div></div>}
            {modal.type === 'community' && <div className="modal-content modal-text"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />PLAY TOGETHER</div><h2 id="modal-title">There's room for you.</h2><p>Join a welcoming community of players sharing tips, finding teammates, and celebrating the worlds they love.</p><div className="community-points"><span><i className="bi bi-chat-dots" /> Find your people</span><span><i className="bi bi-controller" /> Play your way</span><span><i className="bi bi-stars" /> Make it memorable</span></div><button className="button button-primary" onClick={() => setModal({ type: 'message', title: 'Coming together', text: 'Community spaces are opening soon. Sign up for updates to be the first to know.' })}>Get community updates<i className="bi bi-arrow-right" /></button></div>}
            {modal.type === 'story' && <div className="modal-content modal-text"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />{modal.story.category} · {modal.story.date}</div><h2 id="modal-title">{modal.story.title}</h2><p>Stories are better when they're shared. Get a closer look at the people, ideas, and small moments making our game worlds what they are.</p><button className="button button-primary" onClick={() => setModal(null)}>Back to the latest<i className="bi bi-arrow-right" /></button></div>}
            {modal.type === 'news' && <div className="modal-content modal-text"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />THE JOURNAL</div><h2 id="modal-title">More is on the way.</h2><p>Fresh stories, game updates, and behind-the-scenes notes are coming soon. Sign up for the newsletter to catch the next drop.</p><button className="button button-primary" onClick={() => { setModal(null); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>Get updates<i className="bi bi-arrow-right" /></button></div>}
            {modal.type === 'support' && <div className="modal-content modal-text"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />HERE TO HELP</div><h2 id="modal-title">We've got your back.</h2><p>For help with your account, a game, or anything else, our player support team is here for you.</p><a className="button button-primary" href="mailto:support@playfield.example">Contact support<i className="bi bi-arrow-up-right" /></a></div>}
            {modal.type === 'privacy' && <div className="modal-content modal-text"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />YOUR DATA, YOUR CALL</div><h2 id="modal-title">Privacy matters.</h2><p>We only use the information you choose to share to provide updates and improve your experience. We never sell personal data. You can unsubscribe from emails at any time.</p><button className="button button-primary" onClick={() => setModal(null)}>Got it<i className="bi bi-check2" /></button></div>}
            {modal.type === 'notify' && <div className="modal-content modal-text"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" />STAY IN THE KNOW</div><h2 id="modal-title">Hear it here first.</h2><p>Get updates about {modal.title}, launch news, and more in your inbox.</p><form className="modal-form" onSubmit={(event) => { event.preventDefault(); setModal({ type: 'message', title: 'You’re all set', text: 'Thanks for signing up. We’ll let you know when there’s news to share.' }); }}><label htmlFor="notify-email">EMAIL ADDRESS</label><input type="email" id="notify-email" placeholder="you@example.com" required /><button className="button button-primary">Keep me posted<i className="bi bi-arrow-right" /></button></form></div>}
            {modal.type === 'message' && <div className="modal-content modal-text"><div className="success-icon"><i className="bi bi-check2" /></div><h2 id="modal-title">{modal.title}</h2><p>{modal.text}</p><button className="button button-primary" onClick={() => setModal(null)}>Done<i className="bi bi-check2" /></button></div>}
          </section>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
