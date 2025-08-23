DIRECTORIO_BASE=/usr/local/share/empleo_backend
USUARIO_DESPLIEGUE=empleo
GRUPO_DESPLIEGUE=empleo
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
	sudo cp -a $(OBJETIVOS) $(DIRECTORIO_BASE)
	sudo chown -R $(USUARIO_DESPLIEGUE):$(GRUPO_DESPLIEGUE) $(DIRECTORIO_BASE)
	cd $(DIRECTORIO_BASE) && npm install && npm audit fix
	sudo install -m 644 $(SERVICIOS_SYSTEMD) $(BASE_SYSTEMD)
	sudo systemctl daemon-reload
	sudo systemctl enable empleo_backend
	sudo systemctl restart empleo_backend

deploy :
	cp -a $(OBJETIVOS) $(DIRECTORIO_BASE)
	cd $(DIRECTORIO_BASE) && npm install && npm audit fix
	sudo systemctl restart empleo_backend
