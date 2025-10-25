kubectl delete -n student-h-aitenbichler deployment demosypapi
kubectl delete -n student-h-aitenbichler service demosypapi-svc
kubectl delete -n student-h-aitenbichler ingress demosypapi-ingress
kubectl delete -n student-h-aitenbichler pod -l app=demosypapi
kubectl create -f leocloud-deploy-backend-VolumnsClaim.yaml
kubectl create -f leocloud-deploy-backend.yaml

pause
:: kubectl apply -f leocloud-deploy-V2.yaml


:: Copy from volumn => kubectl cp student-h-aitenbichler/demosypapi-79686ccb6c-8r87r:/app/Data .