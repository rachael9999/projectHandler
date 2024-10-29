import { db } from "@/lib/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs";

interface CreateAuditLogProps {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
  message: string; // Add message parameter
}

export const createAuditLog = async (props: CreateAuditLogProps) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    const { entityId, entityType, entityTitle, action, message } = props; // Destructure message

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityTitle,
        entityType,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
        message, // Include message in the audit log entry
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};