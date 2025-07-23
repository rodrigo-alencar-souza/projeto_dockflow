import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  { path: 'home', 
    renderMode: RenderMode.Prerender
  },
      
  { path: 'login', 
    renderMode: RenderMode.Client
   },
  
   { path: 'cadastro-usuario', 
    renderMode: RenderMode.Prerender
  },
      
  { path: 'cadastro-processo', 
    renderMode: RenderMode.Prerender
  },
  
  { path: 'engenharia', 
    renderMode: RenderMode.Server
  },
  { path: 'producao', 
    renderMode: RenderMode.Server
  },
  { path: 'fiscal', 
    renderMode: RenderMode.Server
  },
  
  { path: 'geral', 
    renderMode: RenderMode.Server
  }
];
