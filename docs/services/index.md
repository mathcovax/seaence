# Infrastructure

---

## Sommaire des services

---

- [Abys](abys/schema.md)
- [Beacon](beacon/schema.md)
- [Bottle](bottle/schema.md)
- [Bridge](bridge/schema.md)
- [Coral](coral/schema.md)
- [Harbor](harbor/schema.md)
- [Horizon](horizon/schema.md)
- [Lighthouse](lighthouse/schema.md)
- [MarineSnow](marine-snow/schema.md)
- [Rosetta](rosetta/schema.md)
- [School](school/schema.md)
- [Sea](sea/schema.md)
- [Spotter](spotter/schema.md)

## Schéma micro-service

---

```mermaid
flowchart TB
    subgraph Client
        Spotter[Spotter]
    end

    subgraph Gateway
        Horizon[Horizon]
        Bridge[Bridge]
    end

    subgraph User
        Harbor[Harbor]
		Coral[Coral]
    end

    subgraph Search
        Sea[Sea]
        Abys[Abys]
        Rosetta[Rosetta]
        MarineSnow[MarineSnow]
    end

    subgraph Social
        School[School]
    end

    subgraph BackOffice
        Lighthouse[Lighthouse]
    end

    subgraph Notification
        Bottle[Bottle]
    end

	subgraph Report
		Beacon[Beacon]
	end

    %% Connexions Client
    Spotter --> Horizon
    Lighthouse --> Bridge

    %% Connexions Gateway
    Horizon --> Harbor
    Horizon --> Sea
    Horizon --> Abys
    Horizon --> School
    Horizon --> Bottle
	Horizon --> Coral
	Horizon --> Beacon

    Bridge --> MarineSnow
    Bridge --> Abys
    Bridge --> School
	Bridge --> Beacon

    MarineSnow --> Abys
    Abys --> Sea
    Abys --> Rosetta
	Beacon --> Abys

    %% Connexions Notification
    School --> Bottle
    Harbor --> Bottle
	
    %% Styles
    classDef frontend fill:#42b883,color:white
    classDef gateway fill:#6272a4,color:white
    classDef auth fill:#ff79c6,color:white
    classDef search fill:#8be9fd,color:black
    classDef social fill:#50fa7b,color:black
    classDef bo fill:#ffb86c,color:black
    classDef notification fill:#bd93f9,color:white
	classDef report fill:#8B2920,color:white

    %% Application des styles
    class Spotter frontend
    class Horizon,Bridge gateway
    class Harbor,Coral auth
    class Sea,Abys,MarineSnow,Rosetta,Beacon search
    class School social
    class Lighthouse bo
    class Bottle notification
	class Beacon report
```

## Schéma système

---

```mermaid
flowchart TB
	subgraph Proxmox[Proxmox Server]
		subgraph VMs[Virtuals Machines]
			subgraph Debian5[Debian]
				MasterSwarm[MasterSwarm]
			end

			subgraph Debian6[Debian]
				WorkerSwarm1[WorkerSwarm1]
			end

			subgraph Debian10[Debian]
				WorkerSwarm2[WorkerSwarm2]
			end

			subgraph Debian7[Debian]
				WorkerSwarm3[WorkerSwarm3]
			end

			subgraph Debian9[Debian]
				WorkerSwarm4[WorkerSwarm4]
			end

			subgraph Debian8[Debian]
				WorkerSwarm5[WorkerSwarm5]
			end
		end

		subgraph ContainersLXC[Containers LXC]
			subgraph Debian4[Debian]
				Nginx[Nginx]
				VPN[VPN]
			end

			subgraph Alpine1[Alpine]
				Postgres[Postgres]
			end

			subgraph Debian1[Debian]
				MongoDB[MongoDB]
			end

			subgraph Debian2[Debian]
				ElasticSearch[ElasticSearch]
			end

			subgraph Debian3[Debian]
				GithubRunner[GithubRunner]
			end
		end
	end

	%% Styles pour les sections principales
	classDef vmSectionStyle fill:#BFC0C0,color:#2D3142
	classDef lxcSectionStyle fill:#BFC0C0,color:#2D3142
	
	%% Styles pour les OS
	classDef debianStyle fill:#FFFFFF,color:#2D3142
	classDef alpineStyle fill:#FFFFFF,color:#2D3142
	
	%% Styles pour les services Docker Swarm
	classDef masterSwarmStyle fill:#50fa7b,color:black
	classDef workerSwarmStyle fill:#42b883,color:white
	
	%% Styles pour les services LXC
	classDef webServiceStyle fill:#EF8354,color:white
	classDef databaseStyle fill:#6272a4,color:white
	classDef utilityStyle fill:#02040A,color:white
	
	%% Application des styles
	class Proxmox proxmoxStyle
	class VMs vmSectionStyle
	class ContainersLXC lxcSectionStyle
	
	class Debian5,Debian6,Debian7,Debian8,Debian9,Debian10,Debian1,Debian2,Debian3,Debian4 debianStyle
	class Alpine1 alpineStyle
	
	class MasterSwarm masterSwarmStyle
	class WorkerSwarm1,WorkerSwarm2,WorkerSwarm3,WorkerSwarm4,WorkerSwarm5 workerSwarmStyle
	
	class Nginx,VPN webServiceStyle
	class Postgres,MongoDB,ElasticSearch databaseStyle
	class GithubRunner utilityStyle
```

## Schéma système externe

```mermaid
sequenceDiagram
	participant Client
    participant CloudFlare
	box Server
		participant NGINX
		participant Swarm
	end

	Client ->> CloudFlare: Request
	CloudFlare ->>+ NGINX: Request
	NGINX ->> NGINX: Check CloudFlare IP
	NGINX -->> CloudFlare: Response 401
	CloudFlare -->> Client: Response 401
	NGINX ->>- Swarm: Request
	Swarm ->> NGINX: Response
	NGINX ->> CloudFlare: Response
	CloudFlare ->> Client: Response
```