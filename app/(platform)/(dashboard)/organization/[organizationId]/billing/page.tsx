import { checkSubscription } from "@/lib/check-subscription";
import { Info } from "../_compoenets/info";
import { Separator } from "@/components/ui/separator";
import { SubscriptionButton } from "./_components/subscription-button";

const BillingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <div className="w-full">
        <Info isPro={isPro} />
      </div>
      <Separator className="my-2" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default BillingPage;
