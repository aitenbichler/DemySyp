kubectl delete -n student-h-aitenbichler deployment frontendkeycloakdemo
kubectl delete -n student-h-aitenbichler service frontendkeycloakdemo-svc
kubectl delete -n student-h-aitenbichler ingress frontendkeycloakdemo-ingress
kubectl delete -n student-h-aitenbichler pod -l app=frontendkeycloakdemo
kubectl create -f leocloud-deploy-frontend.yaml


pause
:: kubectl apply -f leocloud-deploy-V2.yaml