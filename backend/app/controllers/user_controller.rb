class UserController < ApplicationController
    before_action :set_item
    attr_reader :current_user

    # GET /me
    def me
      render json: @item
    end
  
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_item
        @current_user = AuthorizeApiRequest.call(request.headers).result
      
        @item = User.find(@current_user['id']).as_json(only: [:id, :name, :email, :created_at, :updated_at])
      end

  end
  