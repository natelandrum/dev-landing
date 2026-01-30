<template>
  <div class="fixed inset-0 pointer-events-none z-0 grid-background"></div>
</template>

<style scoped>
.grid-background {
  background-image: url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='300' height='300' patternUnits='userSpaceOnUse'%3E%3Cline x1='0' y1='0' x2='0' y2='300' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Cline x1='60' y1='0' x2='60' y2='300' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Cline x1='120' y1='0' x2='120' y2='300' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Cline x1='180' y1='0' x2='180' y2='300' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Cline x1='240' y1='0' x2='240' y2='300' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Cline x1='0' y1='0' x2='300' y2='0' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Cline x1='0' y1='60' x2='300' y2='60' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Cline x1='0' y1='120' x2='300' y2='120' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Cline x1='0' y1='180' x2='300' y2='180' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Cline x1='0' y1='240' x2='300' y2='240' stroke='rgba(255,255,255,0.25)' stroke-width='3.5'/%3E%3Ccircle cx='60' cy='120' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3Ccircle cx='180' cy='60' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3Ccircle cx='120' cy='240' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3Ccircle cx='240' cy='180' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3Ccircle cx='180' cy='180' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3Ccircle cx='60' cy='60' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3Ccircle cx='240' cy='240' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3Ccircle cx='120' cy='120' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3Ccircle cx='180' cy='240' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3Ccircle cx='60' cy='180' r='3.5' fill='rgba(0,224,255,0.7)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23grid)'/%3E%3C/svg%3E");
  background-size: 300px 300px;
  opacity: 0.6;
  mask-image: radial-gradient(
    circle at 30% 10%,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.1)
  );
}

html.light .grid-background {
  background-image: url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='300' height='300' patternUnits='userSpaceOnUse'%3E%3Cline x1='0' y1='0' x2='0' y2='300' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Cline x1='60' y1='0' x2='60' y2='300' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Cline x1='120' y1='0' x2='120' y2='300' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Cline x1='180' y1='0' x2='180' y2='300' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Cline x1='240' y1='0' x2='240' y2='300' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Cline x1='0' y1='0' x2='300' y2='0' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Cline x1='0' y1='60' x2='300' y2='60' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Cline x1='0' y1='120' x2='300' y2='120' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Cline x1='0' y1='180' x2='300' y2='180' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Cline x1='0' y1='240' x2='300' y2='240' stroke='rgba(0,102,255,0.3)' stroke-width='3.5'/%3E%3Ccircle cx='60' cy='120' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3Ccircle cx='180' cy='60' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3Ccircle cx='120' cy='240' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3Ccircle cx='240' cy='180' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3Ccircle cx='180' cy='180' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3Ccircle cx='60' cy='60' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3Ccircle cx='240' cy='240' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3Ccircle cx='120' cy='120' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3Ccircle cx='180' cy='240' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3Ccircle cx='60' cy='180' r='3.5' fill='rgba(0,102,255,0.75)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23grid)'/%3E%3C/svg%3E");
  opacity: 0.5;
}
</style>
