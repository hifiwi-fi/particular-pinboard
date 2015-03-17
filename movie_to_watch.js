q = location.href;
p = document.title;
void(t = open('https://pinboard.in/add?later=no&noui=yes&jump=close&url=' + encodeURIComponent(q) + '&title=' + encodeURIComponent(p) + '&tags=movie_to_watch', 'Pinboard', 'toolbar=no,width=100,height=100'));
t.blur();
