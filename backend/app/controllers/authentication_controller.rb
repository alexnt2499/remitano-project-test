# app/controllers/authentication_controller.rb

class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request
 
  def login
    command = AuthenticateUser.call(params[:email], params[:password])
 
    if command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  def signup
    command = SignUpNewUser.call(params[:email], params[:password], params[:name])
 
    if command.success?
      render json: { data: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
  
 end
 