kubectl delete -n student-h-aitenbichler deployment demosypui
kubectl delete -n student-h-aitenbichler service demosypui-svc
kubectl delete -n student-h-aitenbichler ingress demosypui-ingress
kubectl delete -n student-h-aitenbichler pod -l app=demosypui
kubectl create -f leocloud-deploy-frontend.yaml


pause
:: kubectl apply -f leocloud-deploy-V2.yaml