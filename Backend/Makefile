DIRECTORIO_BASE=/usr/local/share/empleo_backend
DIRECTORIO_VAR=/var/lib/empleo
USUARIO_DESPLIEGUE=empleo
GRUPO_DESPLIEGUE=empleo
GRUPO_WWW=www-data
OBJETIVOS=app.js fonts index.js jest.config.mjs package.json perfiles src
BASE_SYSTEMD=/etc/systemd/system
SERVICIOS_SYSTEMD=systemd/empleo_backend.service

.PHONY: help install deploy

help :
	@echo "\nmake deploy"
	@echo "  Despliegue puro, debe hacerse desde el usuario $(USUARIO_DESPLIEGUE)"
	@echo "\nmake install"
	@echo "  Instalación completa, debe hacerse desde un usuario"
	@echo "  con privilegios de administrador (sudo)\n"


install :
	sudo install -d -o $(USUARIO_DESPLIEGUE) -g $(GRUPO_DESPLIEGUE) -m 755 $(DIRECTORIO_BASE)
	sudo rsync -vr --delete --exclude=src/uploads --exclude=perfiles \
		--exclude=.env $(OBJETIVOS) $(DIRECTORIO_BASE)/
	install -d -o $(USUARIO_DESPLIEGUE) -g $(GRUPO_DESPLIEGUE) -m 755 \
		$(DIRECTORIO_BASE)/perfiles
	install -d -o $(USUARIO_DESPLIEGUE) -g $(GRUPO_DESPLIEGUE) -m 755 \
		$(DIRECTORIO_BASE)/src/uploads
	sudo install -d -o $(USUARIO_DESPLIEGUE) -g $(GRUPO_WWW) -m 2750 \
		$(DIRECTORIO_VAR)
	sudo install -d -o $(USUARIO_DESPLIEGUE) -g $(GRUPO_WWW) -m 2750 \
		$(DIRECTORIO_VAR)/fotos
	sudo install -d -o $(USUARIO_DESPLIEGUE) -g $(GRUPO_WWW) -m 2750 \
		$(DIRECTORIO_VAR)/cv
	ln -nsf $(DIRECTORIO_VAR)/fotos $(DIRECTORIO_BASE)/perfiles/fotos
	ln -nsf $(DIRECTORIO_VAR)/cv $(DIRECTORIO_BASE)/src/uploads/cv
	sudo chown -Rh $(USUARIO_DESPLIEGUE):$(GRUPO_DESPLIEGUE) \
		$(DIRECTORIO_BASE)
	cd $(DIRECTORIO_BASE) && npm install && npm audit fix
	sudo install -m 644 $(SERVICIOS_SYSTEMD) $(BASE_SYSTEMD)
	sudo systemctl daemon-reload
	sudo systemctl enable empleo_backend
	sudo systemctl restart empleo_backend

deploy :
	rsync -vr --delete --exclude=src/uploads --exclude=perfiles \
		--exclude=.env $(OBJETIVOS) $(DIRECTORIO_BASE)/
	install -d -m 755 $(DIRECTORIO_BASE)/perfiles
	install -d -m 755 $(DIRECTORIO_BASE)/src/uploads
	ln -nsf $(DIRECTORIO_VAR)/fotos $(DIRECTORIO_BASE)/perfiles/fotos
	ln -nsf $(DIRECTORIO_VAR)/cv $(DIRECTORIO_BASE)/src/uploads/cv
	cd $(DIRECTORIO_BASE) && npm install && npm audit fix
	sudo systemctl restart empleo_backend
