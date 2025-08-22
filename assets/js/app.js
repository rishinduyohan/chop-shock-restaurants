AOS.init();
const navbarItem = document.getElementById("navbar");

const responseNav = () => {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    btn?.addEventListener('click', () => menu.classList.toggle('hidden'));
}

if (navbarItem) {
    const navbar = document.createElement("div");
    navbar.innerHTML = `
        <div class="max-w-7xl mx-auto px-4">
                <div class="flex items-center justify-between h-16">
                    <a href="#" class="flex items-center gap-2">
                        <span class="font-display text-xl font-bold text-green">Chop-Shock</span>
                    </a>
                    <nav class="hidden md:flex items-center gap-8">
                        <a href="#home" class="hover:text-orange">Home</a>
                        <a href="#recipes" class="hover:text-orange">Recipe</a>
                        <a href="#community" class="hover:text-orange">Community</a>
                        <a href="#about" class="hover:text-orange">About Us</a>
                    </nav>
                    <div class="hidden md:flex items-center gap-3">
                        <a href="#"
                            class="px-3 py-1.5 rounded-lg border border-green/20 hover:border-green transition">Sign
                            In</a>
                        <a href="#recipes" class="flex-1 text-center px-3 py-2 rounded-lg bg-green text-white">Explore
                            Recipes</a>
                    </div>
                    <button id="menuBtn"
                        class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-secondary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="mobileMenu" class="sticky md:hidden hidden border-t border-black/5 bg-gray text-center">
                <div class="px-4 py-3 space-y-2">
                    <a href="#home" class="block py-2">Home</a>
                    <a href="#recipes" class="block py-2">Recipe</a>
                    <a href="#community" class="block py-2">Community</a>
                    <a href="#about" class="block py-2">About Us</a>
                    <div class="pt-2 border-t border-black/5 flex gap-2">
                        <a href="#" class="flex-1 text-center px-3 py-2 rounded-lg border border-green/20">Sign In</a>
                        <a href="#recipes" class="flex-1 text-center px-3 py-2 rounded-lg bg-green text-white">Explore
                            Recipes</a>
                    </div>
                </div>
            </div>
   `;
    navbarItem.appendChild(navbar);
    responseNav();
}