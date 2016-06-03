
local M={}
this={}
math.randomseed(os.time())
this.subs={}
this.rect={}

function draw_line(pos,angle,length)
	love.graphics.line(pos.x,pos.y,pos.x+length*math.cos(angle),pos.y+length*math.sin(angle))
end

function M.draw_subject(sub)
	length = 60
	draw_line({x=sub.x-length/2*math.cos(sub.v.rad),y=sub.y-length/2*math.sin(sub.v.rad)},sub.v.rad,length)
	draw_line({x=sub.x+length/2*math.cos(sub.v.rad),y=sub.y+length/2*math.sin(sub.v.rad)},math.pi+sub.v.rad+0.4,15)
	draw_line({x=sub.x+length/2*math.cos(sub.v.rad),y=sub.y+length/2*math.sin(sub.v.rad)},math.pi+sub.v.rad-0.4,15)
end

function M.create(rect,num)
	local vb,vr=120,0.6
	this.rect=rect
	for i=1,num do
		-- 位置
		x=rect.x+math.random(rect.w)
		y=rect.y+math.random(rect.h)
		-- 速度向量
		v = {val=vb+vb*vr*(0.5-math.random()*2),rad=2*math.pi*math.random()}
		-- 反应时间
		rct = 0.4*math.random()+0.1
		-- 手性
		chy = 0
		table.insert(this.subs,{x=x,y=y,v=v,rct=rct,chy=chy})
	end
	return this.subs
end

function M.move(dt)
	print(dt);
	for k,v in pairs(this.subs) do
		local _=this.subs[k]
		_.x = _.x + _.v.val*dt*math.cos(_.v.rad)
		_.y = _.y + _.v.val*dt*math.sin(_.v.rad)
		while _.x>this.rect.x+this.rect.w do
			_.x = _.x-this.rect.w
		end
		while _.x<this.rect.x do
			_.x = _.x+this.rect.w
		end
		while _.y>this.rect.y+this.rect.h do
			_.y = _.y-this.rect.h
		end
		while _.y<this.rect.y do
			_.y = _.y+this.rect.h
		end
	end
end

this.w = love.graphics.getWidth()
this.h = love.graphics.getHeight()

function angle_diff(a1,a2)
	if a2<a1 then
		a2 = a2 + 2*math.pi
	end
	local diff=a2-a1
	if diff>math.pi then
		return diff-2*math.pi
	else
		return a2-a1
	end
end

function M.turn( dt )
	-- ps. 仅处理视野范围内的主体
	dt = dt*0.2
	for k,v in ipairs(this.subs) do
		repeat
			local idx=k
			local _=this.subs[idx]
			if _.x<0 or _.x>this.w or _.y<0 or _.y>this.h then break end
			for i=idx,#this.subs do
				s = this.subs[i]
				s.v.val = s.v.val + 10*(math.random()-0.5)*dt
				s.chy = s.chy + (math.random()-0.5)*0.1*dt
				s.chy = s.chy * 0.999
				while s.v.rad<0 do
					s.v.rad = s.v.rad+2*math.pi
				end
				while s.v.rad>2*math.pi do
					s.v.rad = s.v.rad-2*math.pi
				end
				if i~=idx then
					local diff=math.abs(s.v.val-_.v.val)
					local srad,_rad=s.v.rad,_.v.rad
					local chy_diff=s.chy-_.chy
					s.chy,_.chy = s.chy-chy_diff*dt,_.chy+chy_diff*dt
					if math.abs(s.x-_.x)+math.abs(s.y-_.y) <20 then
						local rspeed=math.random()-0.5
						s.v.val = s.v.val + 10*rspeed*dt
						_.v.val = _.v.val - 10*rspeed*dt
						s.v.rad = s.v.rad + 4*rspeed*dt
						_.v.rad = _.v.rad - 4*rspeed*dt
					elseif math.abs(s.x-_.x)+math.abs(s.y-_.y) <100 then
						if s.v.val>_.v.val then
							s.v.val = s.v.val - 0.05*diff*dt
							_.v.val = _.v.val + 0.15*diff*dt
							s.v.rad = s.v.rad + 0.15*angle_diff(srad , _rad)*dt
							_.v.rad = _.v.rad + 0.35*angle_diff(_rad , srad)*dt
						else
							_.v.val = _.v.val - 0.05*diff*dt
							s.v.val = s.v.val + 0.15*diff*dt
							_.v.rad = _.v.rad + 0.15*angle_diff(_rad , srad)*dt
							s.v.rad = s.v.rad + 0.35*angle_diff(srad , _rad)*dt
						end
					end
				end
				s.v.rad = s.v.rad + s.chy*dt
			end
		until true
	end
end

function M.update(dt)
	M.move(dt)
	M.turn(dt)
end

arrows = M.create({x=-50,y=-50,w = love.graphics.getWidth()+100,h = love.graphics.getHeight()+100},90)

function love.load()
	io.stdout:setvbuf("no")
end
 
function love.update(dt)
	M.update(dt)
end
 
function love.draw()
	for i,v in ipairs(arrows) do
		M.draw_subject(v)
	end
end
