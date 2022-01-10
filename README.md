# Projekt z przedmiotu Technologie Chmurowe

## Uruchomienie

1. Przed rozpoczęciem, projekt do działania Ingress'a wymaga komendy: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.46.0/deploy/static/provider/cloud/deploy.yaml`

2. Kolejnym krokiem jest utworzenie obrazu aplikacji frontendowej oraz backendowej:
    - nazwa obraz tworzona jest według następującej konwencji nazewniczej:

        frontend:   `frontend:000`,
        backend:    `backend:000`,

        gdzie zamiast tagu 000 wpisywana jest konkretna wersja aplikacji np. frontend:001, backend:003 etc.

    - komendy:

        Komendy wpisujemy znajdując się w konkretnych folderach (frontend lub backend):

        `docker build -t frontend:001 .`
        `docker build -t backend:001 .`

3. Następnie przechodzimy do uruchomienia konkretnych elementów projektu:
    Komendy wpisujemy znajdując się w danych folderach (mongo, redis, backend, frontend)
    - mongo:

        - `kubectl apply -f mongo-configmap.yaml`
        - `kubectl apply -f mongo-pv.yaml`
        - `kubectl apply -f mongo-pvc.yaml`
        - `kubectl apply -f mongo-service.yaml`
        - `kubectl apply -f mongo-deployment.yaml`

    - redis:

        - `kubectl apply -f redis-configmap.yaml`
        - `kubectl apply -f redis-pv.yaml`
        - `kubectl apply -f redis-pvc.yaml`
        - `kubectl apply -f redis-service.yaml`
        - `kubectl apply -f redis-deployment.yaml`

    - backend:

        - `kubectl apply -f backend-service.yaml`
        - `kubectl apply -f backend-deployment.yaml`

    - frontend:

        - `kubectl apply -f frontend-service.yaml`
        - `kubectl apply -f frontend-deployment.yaml`

4. Kolejnym krokiem jest uruchomienie Ingress'a:
    Komendę należy wpisać znajdując się w folderze development lub production (w zależności od wersji aplikacji)
    - `kubectl apply -f ingress.yaml`
    
5. Aplikacja jest gotowa. Dostępna jest pod:

    - dla wersji developerskiej `http://dev.127-0-0-1.sslip.io/`
    - dla wersji produkcyjnej `http://prod.127-0-0-1.sslip.io/`

## Działanie oraz funkcjonalność projektu
Projekt jest prostą wersją księgi gości, do której mogą wpisywać się użytkownicy. Można również edytować konkretne wpisy oraz je usuwać. Dodatkowo aplikacja ma wbudowany generator tokenów. Możliwe jest również sprawdzenie, czy dany token jest dalej aktywny (token traci swoją ważność po 20 sekundach). Dane przechowywane są w dwóch bazach - MongoDB oraz Redis. Bazy danych zapewniają trwałość danych. PersistentVolume zapobiega utracie danych.
Baza MongoDB wystawiona jest na porcie 27017, natomiast Redis na porcie 6379. Obie mają po jednej replice. Każda z baz posiada swój ConfigMap, który przechowuje zmienne środowiskowe, które dalej przekazywane są do aplikacji backendowej. Aplikacja backendowa nasłuchuje na porcie 5000. Całość jest wystawiona dzięki nginx'owi działającemu na porcie 80. Część backendowa oraz frontendowa posiadaja po 2 repliki w razie przerwy w działaniu. Poszczególne mikroserwisy komunikują się ze sobą wewnątrz klastra. Projekt ma stworzone osobne namespace'y - dla developmentu oraz produkcji. Oba posiadają aplikacje działające niezależnie. 
