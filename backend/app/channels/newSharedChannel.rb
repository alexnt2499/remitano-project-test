class NewSharedChannel < ApplicationCable::Channel
  def subscribed
    stream_from "NewSharedChannel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def self.send(data) 
    puts "ActionCable.server.broadcast(NewSharedChannel, data): #{@shared}"

    ActionCable.server.broadcast("NewSharedChannel", data)
  end
    
end