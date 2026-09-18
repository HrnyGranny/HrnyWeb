<script setup>
defineProps({
  as: {
    type: String,
    default: "div",
  },
  variant: {
    type: String,
    default: "default",
  },
  title: {
    type: String,
    default: "Windows XP",
  },
})
</script>

<template>
  <component
    :is="as"
    class="xp-window"
    :class="`xp-window--${variant}`"
  >
    <div class="xp-window__bar">
      <span class="xp-window__title">
        <span
          class="xp-window__app-icon"
          aria-hidden="true"
        >
          HG
        </span>

        <span class="xp-window__title-text">
          {{ title }}
        </span>
      </span>

      <span
        class="xp-window__controls"
        aria-hidden="true"
      >
        <span
          class="xp-window__control xp-window__control--minimize"
        >
          <span></span>
        </span>

        <span
          class="xp-window__control xp-window__control--maximize"
        >
          <span></span>
        </span>

        <span
          class="xp-window__control xp-window__control--close"
        >
          <span></span>
        </span>
      </span>
    </div>

    <div class="xp-window__body">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.xp-window {
  --xp-ink: #1c1c1c;
  --xp-body: #ece9d8;

  --xp-blue-highlight: #70a7f5;
  --xp-blue-light: #3d83e7;
  --xp-blue: #1765d5;
  --xp-blue-dark: #0b49ad;
  --xp-blue-border: #063783;

  --xp-control-light: #85b3f1;
  --xp-control: #417fd2;
  --xp-control-dark: #174c99;

  --xp-close-light: #ffad98;
  --xp-close: #e4543d;
  --xp-close-dark: #922117;

  --ui-ink: #1c1c1c;
  --ui-muted: #6d5526;
  --ui-surface: #fbf5dd;
  --ui-primary: #2fa84f;
  --ui-gold: #f0a232;
  --ui-white: #ffffff;

  position: relative;
  box-sizing: border-box;
  width: min(100%, 680px);
  overflow: hidden;
  color: var(--xp-ink);
  background-color: var(--xp-body);
  border: 3px solid var(--xp-blue-border);
  border-radius: 6px 6px 2px 2px;
  font-family: "VT323", monospace;
  box-shadow:
    0 0 0 1px var(--xp-blue-highlight) inset,
    5px 6px 0 rgba(0, 0, 0, 0.3);
}

/* Barra superior */

.xp-window__bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  min-height: 34px;
  padding: 5px 5px 5px 7px;
  overflow: hidden;
  color: #ffffff;
  background:
    linear-gradient(
      180deg,
      var(--xp-blue-highlight) 0,
      var(--xp-blue-light) 12%,
      var(--xp-blue) 48%,
      var(--xp-blue-dark) 100%
    );
  border-bottom: 3px solid var(--xp-blue-border);
  font-family: "Silkscreen", monospace;
  font-size: 8px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-shadow:
    1px 1px 0 var(--xp-blue-border),
    2px 2px 0 rgba(0, 0, 0, 0.15);
  box-shadow:
    0 2px 0 rgba(255, 255, 255, 0.2) inset,
    0 -2px 0 rgba(0, 0, 0, 0.18) inset;
}

/* Brillo discreto integrado */

.xp-window__bar::before {
  position: absolute;
  top: 2px;
  right: 8px;
  left: 8px;
  height: 1px;
  pointer-events: none;
  content: "";
  background-color: rgba(255, 255, 255, 0.4);
}

/* Título */

.xp-window__title {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  overflow: hidden;
}

.xp-window__title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.xp-window__app-icon {
  display: grid;
  place-items: center;
  flex: 0 0 20px;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  color: #ffffff;
  background-color: var(--ui-primary);
  border: 1px solid rgba(255, 255, 255, 0.95);
  font-family: "Press Start 2P", monospace;
  font-size: 5px;
  line-height: 1;
  text-shadow: 1px 1px 0 #176b2d;
  box-shadow:
    0 2px 0 rgba(255, 255, 255, 0.25) inset,
    0 -2px 0 rgba(0, 0, 0, 0.3) inset;
}

/* Contenedor de controles */

.xp-window__controls {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  gap: 3px;
  height: 23px;
  padding: 0;
}

/* Botones con relieve únicamente interior */

.xp-window__control {
  position: relative;
  display: inline-grid;
  place-items: center;
  flex: 0 0 23px;
  box-sizing: border-box;
  width: 23px;
  height: 23px;
  overflow: hidden;
  color: #ffffff;
  background-color: var(--xp-control);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 3px;
  box-shadow:
    2px 2px 0 var(--xp-control-light) inset,
    -2px -2px 0 var(--xp-control-dark) inset;
}

.xp-window__control::after {
  position: absolute;
  inset: 2px;
  pointer-events: none;
  content: "";
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

/* Botón rojo de cierre */

.xp-window__control--close {
  background-color: var(--xp-close);
  box-shadow:
    2px 2px 0 var(--xp-close-light) inset,
    -2px -2px 0 var(--xp-close-dark) inset;
}

/* Minimizar */

.xp-window__control--minimize > span {
  position: absolute;
  right: 5px;
  bottom: 5px;
  left: 5px;
  height: 2px;
  background-color: currentColor;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.45);
}

/* Maximizar */

.xp-window__control--maximize > span {
  box-sizing: border-box;
  width: 11px;
  height: 10px;
  border: 2px solid currentColor;
  border-top-width: 3px;
  filter: drop-shadow(
    1px 1px 0 rgba(0, 0, 0, 0.35)
  );
}

/* Cerrar */

.xp-window__control--close > span {
  position: absolute;
  width: 13px;
  height: 2px;
  background-color: currentColor;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
  transform: rotate(45deg);
}

.xp-window__control--close > span::after {
  position: absolute;
  inset: 0;
  content: "";
  background-color: currentColor;
  transform: rotate(90deg);
}

/*
 * Cuerpo plano.
 * Sin relieve interior para evitar líneas sobre el contenido.
 */

.xp-window__body {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  color: var(--xp-ink);
  background-color: var(--xp-body);
  border-top: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: none;
}

/* Popup */

.xp-window--popup {
  position: absolute;
  z-index: 3;
  width: 196px;
  padding: 0;
  cursor: pointer;
  text-align: left;
  transform: scale(1);
  box-shadow: 5px 6px 0 rgba(0, 0, 0, 0.35);
}

.xp-window--popup .xp-window__bar {
  min-height: 29px;
  padding: 3px 4px 3px 6px;
  font-size: 7px;
}

.xp-window--popup .xp-window__app-icon {
  flex-basis: 17px;
  width: 17px;
  height: 17px;
  font-size: 4px;
}

.xp-window--popup .xp-window__controls {
  height: 21px;
}

.xp-window--popup
  .xp-window__control--minimize,
.xp-window--popup
  .xp-window__control--maximize {
  display: none;
}

.xp-window--popup .xp-window__control--close {
  flex-basis: 21px;
  width: 21px;
  height: 21px;
}

.xp-window--popup
  .xp-window__control--close
  > span {
  width: 11px;
  height: 2px;
}

.xp-window--popup .xp-window__body {
  padding: 0;
}

.xp-window--popup:hover {
  z-index: 12;
  transform: translateY(-2px);
}

.xp-window--popup:active {
  transform: translateY(2px);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
}

/* Popup seguro */

.xp-window--popup.xp-window--safe {
  --xp-blue-highlight: #82df98;
  --xp-blue-light: #52c671;
  --xp-blue: #2fa84f;
  --xp-blue-dark: #176b2d;
  --xp-blue-border: #104a22;
}

.xp-window--popup.xp-window--safe
  .xp-window__bar {
  background:
    linear-gradient(
      180deg,
      var(--xp-blue-highlight) 0,
      var(--xp-blue-light) 12%,
      var(--xp-blue) 48%,
      var(--xp-blue-dark) 100%
    );
}

.xp-window--popup.xp-window--safe
  .xp-window__app-icon {
  background-color: #2fa84f;
}

/* Popup peligroso */

.xp-window--popup.xp-window--danger {
  --xp-blue-highlight: #ff9a84;
  --xp-blue-light: #ef7058;
  --xp-blue: #d83a3a;
  --xp-blue-dark: #851d15;
  --xp-blue-border: #65140e;
}

.xp-window--popup.xp-window--danger
  .xp-window__bar {
  background:
    linear-gradient(
      180deg,
      var(--xp-blue-highlight) 0,
      var(--xp-blue-light) 12%,
      var(--xp-blue) 48%,
      var(--xp-blue-dark) 100%
    );
}

.xp-window--popup.xp-window--danger
  .xp-window__app-icon {
  background-color: #d83a3a;
}

/* Estadísticas */

.xp-window--stat {
  width: 220px;
}

.xp-window--stat .xp-window__body {
  display: grid;
  place-items: center;
  box-sizing: border-box;
  min-height: 64px;
  padding: 12px;
  box-shadow: none;
}

.xp-window--stat .xp-window__bar {
  padding-right: 10px;
}

/* Instrucciones */

.xp-window--instructions {
  width: min(100%, 780px);
}

.xp-window--instructions .xp-window__bar {
  padding-right: 10px;
}

/* Leaderboard */

.xp-window--leaderboard {
  width: min(100%, 650px);
  margin-top: 22px;
}

.xp-window--leaderboard .xp-window__body {
  box-sizing: border-box;
  padding: 12px 18px;
  box-shadow: none;
}

.xp-window--leaderboard .xp-window__bar {
  padding-right: 10px;
}

/* Foco */

.xp-window:focus-visible {
  z-index: 15;
  outline: 3px solid #ffffff;
  outline-offset: 4px;
}

/* Responsive */

@media (max-width: 760px) {
  .xp-window--stat {
    width: 100%;
  }

  .xp-window__bar {
    min-height: 32px;
  }

  .xp-window__controls {
    height: 21px;
  }

  .xp-window__control {
    flex-basis: 21px;
    width: 21px;
    height: 21px;
  }
}

@media (max-width: 600px) {
  .xp-window {
    border-width: 2px;
    border-radius: 4px 4px 1px 1px;
    box-shadow: 4px 5px 0 rgba(0, 0, 0, 0.28);
  }

  .xp-window__bar {
    gap: 6px;
    min-height: 29px;
    padding: 4px;
    border-bottom-width: 2px;
    font-size: 7px;
  }

  .xp-window__app-icon {
    flex-basis: 18px;
    width: 18px;
    height: 18px;
    font-size: 4px;
  }

  .xp-window__controls {
    gap: 2px;
    height: 19px;
  }

  .xp-window__control {
    flex-basis: 19px;
    width: 19px;
    height: 19px;
    border-radius: 2px;
    box-shadow:
      1px 1px 0 var(--xp-control-light) inset,
      -1px -1px 0 var(--xp-control-dark) inset;
  }

  .xp-window__control--close {
    box-shadow:
      1px 1px 0 var(--xp-close-light) inset,
      -1px -1px 0 var(--xp-close-dark) inset;
  }

  .xp-window__control--minimize > span {
    right: 4px;
    bottom: 4px;
    left: 4px;
    height: 2px;
  }

  .xp-window__control--maximize > span {
    width: 9px;
    height: 8px;
    border-width: 1px;
    border-top-width: 2px;
  }

  .xp-window__control--close > span {
    width: 10px;
    height: 2px;
  }

  .xp-window--popup {
    width: 154px;
  }

  .xp-window--popup .xp-window__bar {
    font-size: 6px;
  }

  .xp-window--popup .xp-window__controls {
    height: 19px;
  }

  .xp-window--popup .xp-window__control--close {
    flex-basis: 19px;
    width: 19px;
    height: 19px;
  }

  .xp-window--leaderboard .xp-window__body {
    padding: 8px 6px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .xp-window--popup {
    transition: none;
  }
}
</style>