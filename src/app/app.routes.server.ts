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
  
  { path: 'engineering', 
    renderMode: RenderMode.Server
  },
  { path: 'production', 
    renderMode: RenderMode.Server
  },
  { path: 'tax', 
    renderMode: RenderMode.Server
  },
  
  { path: 'general', 
    renderMode: RenderMode.Server
  }
];
