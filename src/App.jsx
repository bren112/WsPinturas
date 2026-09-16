import { useEffect, useState } from 'react'
import img1 from './imgs/img1.jpeg'
import img2 from './imgs/img2.jpeg'
import img4 from './imgs/img4.jpeg'
import img5 from './imgs/img5.jpeg'
import img6 from './imgs/img6.jpeg'
import img7 from './imgs/img7.jpeg'

const phone = '5519981038842'
const instagramUrl = 'https://www.instagram.com/ws__pinturas/'
const makeWhatsappUrl = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
const whatsappUrl = makeWhatsappUrl('Olá, Wagner! Encontrei a WS Pinturas pelo site e gostaria de solicitar um orçamento.')

const Arrow = ({ diagonal = false }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="icon-arrow"><path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14M13 6l6 6-6 6'} /></svg>
)
const Check = () => <svg aria-hidden="true" viewBox="0 0 24 24" className="icon-check"><path d="m5 12 4 4L19 6" /></svg>

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])
  const close = () => setOpen(false)
  return (
    <header className={`site-header ${scrolled || open ? 'is-solid' : ''}`}>
      <a href="#inicio" className="brand" aria-label="WS Pinturas — início" onClick={close}><img src="/images/brand/ws-pinturas-logo.png" alt="WS Pinturas" width="319" height="133" /></a>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
        {[[ 'Início', '#inicio' ], [ 'Serviços', '#servicos' ], [ 'Projetos', '#projetos' ], [ 'Cores', '#simulador' ], [ 'Sobre', '#sobre' ], [ 'Contato', '#contato' ]].map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={close}>Solicitar orçamento <Arrow diagonal /></a>
      </nav>
      <button className={`menu-toggle ${open ? 'is-open' : ''}`} type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /></button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <img className="hero-media" src={img1} alt="Fachada residencial sendo renovada pela equipe WS Pinturas" width="1600" height="914" fetchPriority="high" />
      <div className="hero-shade" /><div className="hero-grain" />
      <div className="hero-content page-shell"><div className="eyebrow light">Santa Rita do Passa Quatro e região</div><h1 id="hero-title">Transformamos ambientes <em>através da pintura.</em></h1><p>Pintura profissional com cuidado em cada detalhe.</p>
        <div className="hero-actions"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Solicitar orçamento <Arrow /></a><a className="text-link light-link" href="#projetos">Ver nossos trabalhos <Arrow /></a></div>
      </div>
      <a href="#servicos" className="scroll-cue" aria-label="Ir para a seção de serviços"><span>Explore</span><i /></a>
    </section>
  )
}

const services = [
  ['01', 'Pintura residencial', 'Soluções cuidadosas para renovar casas, apartamentos e os ambientes onde a vida acontece.'],
  ['02', 'Pintura comercial', 'Uma apresentação renovada para espaços comerciais que precisam transmitir profissionalismo.'],
  ['03', 'Pintura interna', 'Paredes, tetos e detalhes tratados para criar ambientes mais agradáveis e bem-acabados.'],
  ['04', 'Pintura externa', 'Renovação visual de fachadas e áreas externas com atenção à preparação e ao acabamento.'],
  ['05', 'Renovação de ambientes', 'Uma nova combinação de cores e acabamentos para mudar a sensação do seu espaço.'],
]

function Services() {
  const [active, setActive] = useState(0)
  return (
    <section className="section services" id="servicos" aria-labelledby="services-title"><div className="page-shell services-layout reveal">
      <div className="section-intro sticky-intro"><div className="eyebrow">Serviços</div><h2 id="services-title">Pintura bem-feita muda tudo.</h2><p>Do preparo à última demão, cada etapa importa para chegar a um resultado limpo e consistente.</p></div>
      <div className="services-list">{services.map(([number, title, description], index) => <article className={`service-row ${active === index ? 'is-active' : ''}`} key={title} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} tabIndex="0"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><span className="service-mark">+</span></article>)}</div>
    </div></section>
  )
}

const projects = [
  { src: img1, alt: 'Fachada residencial ampla durante renovação', label: 'Renovação de fachada', className: 'project-wide' },
  { src: img2, alt: 'Fachada clara com acabamento em tons neutros', label: 'Acabamento externo', className: 'project-tall' },
  { src: img4, alt: 'Equipe WS Pinturas trabalhando na área externa', label: 'Equipe em ação', className: 'project-tall' },
  { src: img5, alt: 'Portão branco recém-pintado', label: 'Pintura de portão', className: 'project-tall' },
  { src: img6, alt: 'Fachada moderna em cinza e branco', label: 'Fachada contemporânea', className: 'project-tall' },
  { src: img7, alt: 'Casa moderna com pintura cinza e branca', label: 'Composição de tons', className: 'project-wide' },
]

function Projects() {
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    if (!selected) return undefined
    const onKey = (event) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey); document.body.classList.add('modal-open')
    return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('modal-open') }
  }, [selected])
  return (
    <section className="section projects" id="projetos" aria-labelledby="projects-title"><div className="page-shell">
      <div className="projects-heading reveal"><div><div className="eyebrow">Projetos reais</div><h2 id="projects-title">Nosso trabalho<br /><em>fala por nós.</em></h2></div><p>Alguns dos ambientes renovados pela WS Pinturas, com atenção ao preparo, à proteção e ao acabamento.</p></div>
      <div className="editorial-grid">{projects.map((project, index) => <button className={`project-item ${project.className} reveal`} key={project.src} onClick={() => setSelected(project)} aria-label={`Ampliar imagem: ${project.label}`}><img src={project.src} alt={project.alt} loading="lazy" /><span className="project-caption"><b>{String(index + 1).padStart(2, '0')}</b>{project.label}<i><Arrow diagonal /></i></span></button>)}</div>
      <div className="gallery-note reveal"><span>Trabalhos realizados pela WS Pinturas.</span><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">Veja mais no Instagram <Arrow diagonal /></a></div>
    </div>{selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.label} onClick={() => setSelected(null)}><button type="button" className="lightbox-close" onClick={() => setSelected(null)} aria-label="Fechar imagem">×</button><img src={selected.src} alt={selected.alt} onClick={(event) => event.stopPropagation()} /></div>}</section>
  )
}

const paintColors = [
  { name: 'Tempestade', code: 'D177', ncs: '2609-Y99R', rgb: '192, 175, 173', hex: '#c0afad' },
  { name: 'Cipó da Amazônia', code: 'N879', ncs: '5030-G70Y', rgb: '118, 119, 69', hex: '#767745' },
  { name: 'Ninho', code: 'C378', ncs: '2610-Y28R', rgb: '199, 181, 156', hex: '#c7b59c' },
  { name: 'Pasta de Amendoim', code: 'B172', ncs: '1308-Y39R', rgb: '225, 210, 190', hex: '#e1d2be' },
  { name: 'Miragem', code: 'S126', ncs: '1811-Y91R', rgb: '211, 189, 184', hex: '#d3bdb8' },
  { name: 'Verde-lavado', code: 'B055', ncs: '0910-G35Y', rgb: '217, 225, 206', hex: '#d9e1ce' },
  { name: 'Copacabana', code: 'E021', ncs: '1208-Y72R', rgb: '228, 211, 201', hex: '#e4d3c9' },
  { name: 'Goiabada', code: 'R243', ncs: '4548-Y88R', rgb: '123, 62, 60', hex: '#7b3e3c' },
]

function ColorVisualizer() {
  const [selected, setSelected] = useState(paintColors[0])
  const colorBudgetUrl = makeWhatsappUrl(`Olá, Wagner! Usei o simulador no site e gostei da cor ${selected.name} (Suvinil ${selected.code} · NCS ${selected.ncs}). Gostaria de solicitar um orçamento para pintar meu ambiente nessa cor.`)
  return (
    <section className="color-lab" id="simulador" aria-labelledby="color-title"><div className="page-shell color-heading reveal"><div><div className="eyebrow">Simulador de cores</div><h2 id="color-title">Imagine antes<br /><em>de pintar.</em></h2></div><p>Escolha um tom para ver a parede mudar. Depois, envie a seleção junto com seu pedido de orçamento.</p></div>
      <div className="page-shell color-workspace reveal"><div className="room-preview" style={{ '--wall-color': selected.hex }} aria-live="polite"><div className="room-wall"><span className="window"><i /></span><span className="frame frame-one" /><span className="frame frame-two" /></div><div className="room-floor" /><div className="sofa"><span /><span /><i /></div><div className="side-table"><i /></div><div className="selected-badge"><span style={{ background: selected.hex }} /><div><small>Na parede</small><strong>{selected.name}</strong></div></div></div>
        <div className="palette-panel"><div className="palette-top"><span>Paleta Suvinil 2026</span><small>{paintColors.length} cores</small></div><div className="swatch-grid" role="list" aria-label="Escolha uma cor para a parede">{paintColors.map((color) => <button key={color.code} type="button" className={`swatch ${selected.code === color.code ? 'is-selected' : ''}`} onClick={() => setSelected(color)} aria-label={`Aplicar cor ${color.name}`} aria-pressed={selected.code === color.code}><i style={{ background: color.hex }} /><span><strong>{color.name}</strong><small>{color.code}</small></span><b><Check /></b></button>)}</div>
          <div className="color-detail"><span className="detail-chip" style={{ background: selected.hex }} /><div><small>Cor escolhida</small><h3>{selected.name}</h3><p>Suvinil {selected.code} · NCS {selected.ncs}<br />RGB {selected.rgb}</p></div></div>
          <a className="button button-primary color-quote" href={colorBudgetUrl} target="_blank" rel="noreferrer">Pedir orçamento com esta cor <Arrow diagonal /></a><p className="color-disclaimer">A cor na tela é uma referência e pode variar conforme o monitor e a iluminação. Confirme o tom com uma amostra física antes da pintura.</p>
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  { quote: 'Mão de obra de qualidade!', author: 'Ronaldo' },
  { quote: 'A atenção aos detalhes é notável e faz toda a diferença. Parabéns!', author: 'BLS Soluções Arquitetônicas' },
  { quote: 'Profissionais de primeiro escalão.', author: 'Augusto Jannini' },
]

function Testimonials() {
  return <section className="testimonials" aria-labelledby="testimonials-title"><div className="page-shell"><div className="testimonial-heading reveal"><div className="eyebrow">Depoimentos</div><h2 id="testimonials-title">O que nossos<br /><em>clientes dizem.</em></h2></div><div className="testimonial-grid">{testimonials.map(({ quote, author }, index) => <article className="testimonial-card reveal" key={author}><div className="stars" aria-label="5 de 5 estrelas">★★★★★</div><blockquote>“{quote}”</blockquote><footer><span>{String(index + 1).padStart(2, '0')}</span><strong>{author}</strong></footer></article>)}</div></div></section>
}

function About() {
  const values = [['Cuidado nos detalhes', 'Atenção aos recortes, superfícies e à organização durante o serviço.'], ['Acabamento profissional', 'Um olhar técnico e cuidadoso para entregar um resultado bem-feito.'], ['Atendimento próximo', 'Conversa direta com Wagner para entender o que cada ambiente precisa.'], ['Compromisso com cada projeto', 'Respeito pelo espaço e dedicação em todas as etapas do trabalho.']]
  return <section className="about" id="sobre" aria-labelledby="about-title"><div className="page-shell about-top reveal"><div className="about-kicker"><span>WS</span><i /></div><div className="about-copy"><div className="eyebrow light">Sobre a WS</div><h2 id="about-title">Quem cuida da<br />sua pintura.</h2><p>A WS Pinturas tem Wagner Severino à frente de cada atendimento. Uma relação simples e próxima, desde a primeira conversa até a entrega do ambiente renovado.</p><p>Atendemos Santa Rita do Passa Quatro e região com foco no que realmente importa: entender seu espaço, trabalhar com cuidado e buscar um acabamento que valorize o ambiente.</p><a className="text-link light-link" href={whatsappUrl} target="_blank" rel="noreferrer">Conversar com Wagner <Arrow /></a></div></div><div className="page-shell values-grid reveal">{values.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><Check /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
}

function Contact() {
  return <section className="contact" id="contato" aria-labelledby="contact-title"><div className="contact-accent" aria-hidden="true">WS</div><div className="page-shell contact-inner reveal"><div className="eyebrow">Vamos conversar?</div><h2 id="contact-title">Seu ambiente merece<br /><em>uma nova cara.</em></h2><p>Fale com Wagner e solicite seu orçamento.</p><a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp <Arrow diagonal /></a><div className="contact-meta"><a href="tel:+5519981038842">(19) 98103-8842</a><span>Santa Rita do Passa Quatro e região</span><a href={instagramUrl} target="_blank" rel="noreferrer">@ws__pinturas</a></div></div></section>
}

function Footer() {
  return <footer className="footer"><div className="page-shell footer-main"><img src="/images/brand/ws-pinturas-logo.png" alt="WS Pinturas" width="319" height="133" /><nav aria-label="Links do rodapé"><a href="#inicio">Início</a><a href="#servicos">Serviços</a><a href="#projetos">Projetos</a><a href="#simulador">Simulador de cores</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav><div className="footer-contact"><span>Atendimento</span><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a><p>Santa Rita do Passa Quatro e região</p></div></div><div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} WS Pinturas</span><span>Pintura com cuidado em cada detalhe.</span></div></footer>
}

function WhatsAppButton() {
  return <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Solicitar orçamento pelo WhatsApp"><svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 4A12 12 0 0 0 5.7 22.2L4 28l6-1.6A12 12 0 1 0 16 4Zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.5.9 1-3.4-.3-.4A9.8 9.8 0 1 1 16 25.8Zm5.4-7.3c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.4.2-.7.1a8 8 0 0 1-3.8-3.4c-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5H12c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.3 3.4 1.5 3.6c.2.2 2.5 3.8 6 5.3 2.2.9 3.1 1 4.2.8.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" /></svg><span>WhatsApp</span></a>
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  return <><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Header /><main id="conteudo"><Hero /><Services /><Projects /><ColorVisualizer /><Testimonials /><About /><Contact /></main><Footer /><WhatsAppButton /></>
}
