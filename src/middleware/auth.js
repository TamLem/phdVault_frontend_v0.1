export default function auth({ next, router }) {
    if (!localStorage.getItem("tokens")) {
        return router.push({ name: 'login' });
    }
    return next();
}