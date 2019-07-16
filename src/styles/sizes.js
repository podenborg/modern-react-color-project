export default {
  up() {

  },
  down(size) {
    const sizes = {
      xs: '500.98px',
      sm: '600.98px',
      md: '800.98px',
      lg: '1000.98px'
    };
    return `@media (max-width: ${sizes[size]})`;
  }
}