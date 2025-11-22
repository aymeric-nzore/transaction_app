from rest_framework.routers import DefaultRouter
from .views import TransactionListView

router = DefaultRouter()
router.register("transactions" , TransactionListView , basename="transactions")

urlpatterns = router.urls