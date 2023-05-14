class NotificationService
    def self.send_notification(shared)
      # Send notifications to users or administrators
      # Code to send emails, push notifications, etc.
      NewSharedChannel.send(shared);

    end
  end
  