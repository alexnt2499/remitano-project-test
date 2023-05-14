class SharedController < ApplicationController
  before_action :set_shared, only: [:update]
  before_action :set_current_user
  attr_reader :current_user

  # GET /shared
  def index
    @resData = {}
    @resData[:shared] = Shared.joins(:user).order('created_at DESC').paginate(page: params[:page], per_page: params[:per_page])
    @resData[:total] = Shared.count
    render json: @resData.as_json(include: :user)
  end

  # POST /shared
  def create
    @shared = Shared.new(shared_params)
    @shared.user_id = current_user
    if @shared.save
      SharedCreationJob.perform_now(@shared)
      render json: @shared, status: :created, location: @shared
    else
      render json: @shared.errors, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_shared
    @shared = Shared.find(params[:id])
  end

  def set_current_user
    @current_user = AuthorizeApiRequest.call(request.headers).result["id"];
  end

  # Only allow a list of trusted parameters through.
  def shared_params
    params.require(:shared).permit(:name, :description, :url)
  end
end
