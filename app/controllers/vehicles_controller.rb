class VehiclesController < ApplicationController
  before_action :set_vehicle, only: [:show, :update, :destroy]
  before_action :authorize_request, except: %i[index show]

  # GET /vehicles
  def index
    @vehicles = Vehicle.all

    render json: @vehicles
  end

  # GET /vehicles/1
  def show
    @vehicle = Vehicle.find(params[:id])
    @flashcards = Flashcard.where(vehicle_id: @vehicle.id)

    render json: @vehicle, include: :flashcards 
  end

  # POST /vehicles
  def create
    @vehicle = Vehicle.new(vehicle_params)

    if @current_user.vehicles << @vehicle
      render json: @vehicle, status: :created, location: @vehicle
    else
      render json: @vehicle.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /vehicles/1
  def update
    if @vehicle.user == @current_user
      if @vehicle.update(vehicle_params)
        render json: @vehicle
      else
        render json: @vehicle.errors, status: :unprocessable_entity
      end
    else
    render json: { errors: "not authorized" }, status: :unauthorized
    end
  end

  # DELETE /vehicles/1
  def destroy
    if @vehicle.user == @current_user
      @vehicle.destroy
  else
    render json: { errors: "not authorized" }, status: :unauthorized
  end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vehicle
      @vehicle = Vehicle.find(params[:id])

    end

    # Only allow a trusted parameter "white list" through.
    def vehicle_params
      params.require(:vehicle).permit(:title, :image, :language, :genre, :category)
    end
  
end
