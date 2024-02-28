import React from 'react'
import { Typography } from "@mui/material";
import { CartRegular } from '@fluentui/react-icons';
import { useCart } from '../context/CartProvider';

function Header() {
  const { cartQtd } = useCart();

  return (
    
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px', marginInlineStart: '340px' }}>
      <Typography variant="h4" style={{ color: 'white', fontSize: '1rem' }}>
        Artisan Resto Cafe
      </Typography>

      <div style={{ position: 'relative', marginRight: '360px', color: 'white', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>My orders</span>
        <svg class="w-8 h-8 ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="1.5em" height="1.5em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3.5c0-.28.22-.5.5-.5h.44c.72 0 1.14.47 1.38.94.17.32.29.72.39 1.06H16a1 1 0 0 1 .96 1.27l-1.5 5.28A2 2 0 0 1 13.55 13H8.46a2 2 0 0 1-1.93-1.47L5.9 9.17l-.01-.03-1.03-3.5-.1-.33a5.2 5.2 0 0 0-.32-.91c-.16-.31-.3-.4-.5-.4H3.5a.5.5 0 0 1-.5-.5Zm3.84 5.37.66 2.4a1 1 0 0 0 .96.73h5.08a1 1 0 0 0 .96-.73L16 6H6l.84 2.87ZM10 15.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Zm6 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z" fill="currentColor"></path>
        </svg>
        <div style={{ position: 'relative', color: 'white', alignItems: 'flex-end' }}>
          <span
            style={{
              position: 'absolute',
              top: '-18px',
              right: '-5px',
              backgroundColor: '#e53e3e',  
              borderRadius: '50%',
              padding: '2px 4px',
              fontSize: '10px',
              color: 'white',
            }}
          >
            {cartQtd()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
