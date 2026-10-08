const paths = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  calendar: 'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M8 14h2 M14 14h2 M8 18h2',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  chart: 'M4 3v18h17 M8 16v-5 M13 16V7 M18 16v-8',
  search: 'M21 21l-5-5 M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z',
  plus: 'M12 5v14 M5 12h14',
  arrow: 'M5 12h14 M14 7l5 5-5 5',
  chevron: 'M9 5l7 7-7 7',
  check: 'M5 12l4 4L19 6',
  clock: 'M12 8v4l3 2 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  download: 'M12 3v12 M7 10l5 5 5-5 M4 16v5h16v-5',
  edit: 'M15 5l4 4 M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15z',
  close: 'M6 6l12 12 M18 6L6 18',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  external: 'M14 3h7v7 M21 3l-9 9 M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5',
  shield: 'M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6z M8 12l3 3 5-6',
  paw: 'M8 14c-2 2-4 4-2 6s4-1 6-1 4 3 6 1 0-4-2-6-6-2-8 0z M5 7a2 3 0 1 0 0 6 2 3 0 0 0 0-6z M10 2a2 3 0 1 0 0 6 2 3 0 0 0 0-6z M16 3a2 3 0 1 0 0 6 2 3 0 0 0 0-6z M21 8a2 3 0 1 0 0 6 2 3 0 0 0 0-6z',
}

export default function AdminIcon({ name, size = 20, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.grid} /></svg>
}
