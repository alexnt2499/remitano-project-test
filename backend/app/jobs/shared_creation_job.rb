class SharedCreationJob < ApplicationJob
    queue_as :default
  
    def perform(shared)
        
      # Send notifications
      NotificationService.send_notification(shared)
  
    end
  end
  